export interface AppError extends Error {
  response: Response;
  statusCode: number;
}

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}