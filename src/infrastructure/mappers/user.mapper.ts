import { UserModel } from "../../data"
import { CustomerError, Role, UserEntity } from "../../domain"

export class UserMapper {
  /**
   *
   * @param object Entity o Model from database to UserEntity
   * @returns  {UserEntity}
   */
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, role } = object
    if (!id || !_id) throw CustomerError.badRequest("Missing id")
    if (!name) throw CustomerError.badRequest("Missing name")
    if (!email) throw CustomerError.badRequest("Missing email")
    if (!password) throw CustomerError.badRequest("Missing password")
    if (!role) throw CustomerError.badRequest("Missing role")
    return new UserEntity(_id || id, name, email, password, role as Role[])
  }
}
