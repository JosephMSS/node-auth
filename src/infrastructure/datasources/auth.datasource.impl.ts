import {
  AuthDatasource,
  CustomerError,
  RegisterUserDto,
  UserEntity,
} from "../../domain"

export class AuthDataSourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto
    try {
      // 1. verificar si ya existe el email
      if (email === "admin@mail.com") {
        throw CustomerError.badRequest("El email ya existe")
      }
      // 2. hash la contraseña es correcta

      //aqui iría la lógica de login
      return new UserEntity("1", name, email, password, ["admin"])
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
