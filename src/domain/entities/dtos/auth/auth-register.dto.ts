import { Validators } from "../../../../config"


export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = props
    if (!name) return ["Name is required"]
    if (!email) return ["Email is required"]
    if (!Validators.email.test(email)) return ["Email is not valid"]
    if (!password) return ["Password is required"]
    const success=undefined
    return [success, new RegisterUserDto(name, email, password)]
  }
}
