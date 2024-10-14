import { Router } from "express"
import { AuthController } from "./auth.controller"
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure"
import { AuthMiddleware } from "../middlewares/auth.middleware"

export class AuthRoutes {
  /**
   * Si no vamos a hacer inyección de dependencias, podemos usar el método estático
   */
  static get routes(): Router {
    const router = Router()
    const datasource = new AuthDataSourceImpl()
    const repository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(repository)

    router.post("/login", controller.login)
    // @ts-expect-error
    router.post("/register", controller.register)
    // @ts-expect-error
    router.get("/", [AuthMiddleware.validateJwt], controller.find)

    return router
  }
}
