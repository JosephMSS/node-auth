import mongoose from "mongoose"
interface Options {
  mongoUrl: string
  dbName: string
}
export class MongoDatabase {
  static async connect(options: Options): Promise<void> {
    const { dbName, mongoUrl } = options
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      })
      console.log("MongoDB connected")
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
