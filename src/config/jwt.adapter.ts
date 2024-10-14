import jwt from "jsonwebtoken"
import { envs } from "./config"
export const JWT_SECRET = envs.libs.jwt.secret as string 
export class JwtAdapter {
  static generateToken(
    payload: Object,
    duration = "2h"
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, (error, token) => {
        if (error) return reject(null)
        resolve(token!)
      })
    })
  }
  static verifyToken<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (error, decoded) => {
        resolve(decoded as T)
      })
    })
  }
}
