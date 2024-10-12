import { BcryptAdapter } from "../../config"
import { UserModel } from "../../data"
import {
  AuthDatasource,
  CustomerError,
  RegisterUserDto,
  Role,
  UserEntity,
} from "../../domain"

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashPassword: string) => boolean
export class AuthDataSourceImpl implements AuthDatasource {
  private userModel = UserModel
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto
    try {
      // 1. verificar si ya existe el email
      const userExist = await this.userModel.findOne({ email })
      if (userExist) {
        throw CustomerError.badRequest("User already exists")
      }
      // 2. hash la contraseña es correcta
      const newUser = await this.userModel.create({
        email,
        name,
        password: this.hashPassword(password),
        role: [Role.USER_ROLE],
      })
      await newUser.save()
      return new UserEntity(
        newUser._id.toString(),
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.role as Role[]
      )
    } catch (error) {
      //si es un error custom que lo lance y ya tendíamos nuestro handler de estos errores en especifico
      if (error instanceof CustomerError) {
        throw error
      }
      throw CustomerError.internalServerError()
    }
  }
  login(email: string, password: string): Promise<any> {
    throw new Error("Method not implemented.")
  }
}
