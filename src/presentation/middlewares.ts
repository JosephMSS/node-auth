import { NextFunction, Request, Response } from "express"
import { CustomError } from "../domain"
export const handleErrorCustomError = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message })
  }
  console.error(error)
  return res.status(500).json({ error: "Internal Server Error" })
}
