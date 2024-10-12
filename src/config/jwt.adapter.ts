import jwt from "jsonwebtoken"
export class JwtAdapter {
  static generateToken(
    payload: Object,
    duration = "2h"
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, "this.secret", (error, token) => {
        if (error) return reject(null)
        resolve(token!)
      })
    })
  }
}
