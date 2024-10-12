export enum Role {
  ADMIN_ROLE = "ADMIN_ROLE",
  USER_ROLE = "USER_ROLE",
}
export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role[]
  ) {}
}
