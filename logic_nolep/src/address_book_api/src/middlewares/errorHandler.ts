import { AppError } from "../errors/app.error";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
