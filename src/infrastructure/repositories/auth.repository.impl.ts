import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly datasourse: AuthDatasource) {}
    login(email: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasourse.register(registerUserDto);
    }
}