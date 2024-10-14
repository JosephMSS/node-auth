import { NextFunction, Request, Response } from "express"
import { JwtAdapter } from "../../config/jwt.adapter"
import { UserModel } from "../../data"

export class AuthMiddleware {
  static validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization")
    if (!authorization) {
      return res.status(401).json({ error: "No token provided" })
    }
    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token" })
    }
    const token = authorization.split(" ").at(1)
    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token!)
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" })
      }
      console.log("🚀 ~ AuthMiddleware ~ payload:", payload)
      const user= await UserModel.findById(payload.id)
      /**
       * Mi backend firmo un token con el id del usuario, que no existe oque ha sido eliminado
       */
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" })
      }
      req.body.user = user
      next()
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
