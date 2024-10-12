import express, { Router } from "express"
export interface Options {
  port?: number
  routes: Router
}
// TODO: poR QUE AQUEI ESTOY USANDO EXPRESS DIRECTAMANTE Y NO POR INYECCION
export class Server {
  public readonly app = express()
  private port: number
  private routes: Router
  constructor(options: Options) {
    const { port = 3001, routes } = options
    this.port = port
    this.routes = routes
  }
  async start() {
    //* middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(this.routes)
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`)
    })
  }
}
