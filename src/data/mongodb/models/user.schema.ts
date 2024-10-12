import { model, Schema } from "mongoose"
import { Role } from "../../../domain"

/**
 * Schema define como va a ser el modelo
 */

export const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: [String],
    required: true,
    default: Role.USER_ROLE,
    enum: Object.values(Role) as Role[],
  },
})
export const UserModel = model("User", userSchema)