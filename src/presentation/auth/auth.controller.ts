import { NextFunction, Request, Response } from "express"
import { JwtAdapter } from "../../config/jwt.adapter"
import { UserModel } from "../../data"
import { AuthRepository, RegisterUserDto } from "../../domain"

/**
 * De esta manera evito que el this cambie
 */
export class AuthController {
  constructor(private authRepository: AuthRepository) {}
  /**
   * Puede ser una excepción controlada o no controlada, por lo que es desconocido(unknown)
   */

  register = (req: Request, res: Response, next: NextFunction) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })
    this.authRepository
      .register(registerUserDto!)
      .then(async (registeredUser) => {
        return res.status(201).json({
          user: registeredUser,
          token: await JwtAdapter.generateToken({
            id: registeredUser.id,
            email: registeredUser.email,
          }),
        })
      })
      .catch((error) => {
        next(error)
      })
  }
  find = async (req: Request, res: Response, next: NextFunction) => {
    UserModel.find()
      .then((users) => {
        res.json({ users, user: req.body.user })
      })
      .catch((error) => {
        next(error)
      })
  }
  login = (req: Request, res: Response) => {
    const { body } = req
    res.json(body)
  }
}
