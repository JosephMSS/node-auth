import { NextFunction, Request, Response } from "express"
import {
  AuthRepository,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain"

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
      .then((registeredUser) => {
        return res.status(201).json(registeredUser)
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
