import { RegisterUserDto, UserEntity } from "../entities"

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<any>
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
