import { Router } from "express"
import { AuthRoutes } from "./auth/auth.routes"

export class AppRoutes {
  /**
   * Si no vamos a hacer inyección de dependencias, podemos usar el método estático
   */
  static get routes(): Router {
    const router = Router()
    router.use("/api/auth", AuthRoutes.routes)
    return router
  }
}
