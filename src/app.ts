import { envs } from "./config"
import { MongoDatabase } from "./data"
import { AppRoutes } from "./presentation/routes"
import { Options, Server } from "./presentation/server"
;(() => {
  main()
})()
async function main() {
  // todo: await database
  const { dbName, url } = envs.database.mongo
  MongoDatabase.connect({
    dbName: dbName,
    mongoUrl: url,
  })
  // todo: await server
  const options: Options = {
    port: envs.port,
    routes: AppRoutes.routes,
  }
  const server = new Server(options)
  await server.start()
}
