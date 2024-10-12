import { Request, Response } from "express"
import { AuthRepository, RegisterUserDto, UserEntity } from "../../domain"

/**
 * De esta manera evito que el this cambie
 */
export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })
    this.authRepository
      .register(registerUserDto!)
      .then((registeredUser) => {
        return res.status(201).json(registeredUser)
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  }
  login = (req: Request, res: Response) => {
    const { body } = req
    res.json(body)
  }
}
