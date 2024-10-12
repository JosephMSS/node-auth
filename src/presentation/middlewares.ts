import { NextFunction, Request, Response } from "express"
import { CustomError } from "../domain"
import { ErrorHandler } from "./server"
export const handleErrorCustomError: ErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message })
  }
  console.error(error)
  return res.status(500).json({ error: "Internal Server Error" })
}
