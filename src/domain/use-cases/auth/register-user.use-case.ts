import { JwtAdapter } from "../../../config/jwt.adapter"
import { RegisterUserDto, UserEntity } from "../../entities"
import { CustomError } from "../../errors"
import { AuthRepository } from "../../repositories/auth.repository"
export type SignToken = (
  payload: Object,
  duration?: string
) => Promise<string | null>
interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
export interface RegisterUserUseCase {
  execute(user: RegisterUserDto): Promise<any>
}
export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly userRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}
  async execute(user: RegisterUserDto): Promise<UserToken> {
    // const userEntity = new UserEntity(user)
    const { email, id, name } = await this.userRepository.register(user)
    const token = await this.signToken({ id, email }, "2h")
    if (!token) throw CustomError.internalServerError()
    return {
      token,
      user: {
        id,
        name,
        email,
      },
    }
  }
}
