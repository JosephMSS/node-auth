import express, { NextFunction, Request, Response, Router } from "express"
export type ErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void
type Middlewares = ErrorHandler[]
export interface Options {
  port?: number
  routes: Router
  middlewares?: Middlewares
}
// TODO: poR QUE AQUEI ESTOY USANDO EXPRESS DIRECTAMANTE Y NO POR INYECCION
export class Server {
  public readonly app = express()
  private port: number
  private routes: Router
  private middlewares: Middlewares
  constructor(options: Options) {
    const { port = 3001, routes, middlewares = [] } = options
    this.port = port
    this.routes = routes
    this.middlewares = middlewares
  }
  async start() {
    //* middlewares

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(this.routes)
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware)
    })
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`)
    })
  }
}
