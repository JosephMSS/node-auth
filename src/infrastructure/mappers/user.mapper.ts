import { UserModel } from "../../data"
import { CustomError, Role, UserEntity } from "../../domain"

export class UserMapper {
  /**
   *
   * @param object Entity o Model from database to UserEntity
   * @returns  {UserEntity}
   */
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, role } = object
    if (!id || !_id) throw CustomError.badRequest("Missing id")
    if (!name) throw CustomError.badRequest("Missing name")
    if (!email) throw CustomError.badRequest("Missing email")
    if (!password) throw CustomError.badRequest("Missing password")
    if (!role) throw CustomError.badRequest("Missing role")
    return new UserEntity(_id || id, name, email, password, role as Role[])
  }
}
