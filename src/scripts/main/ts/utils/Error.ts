export interface AppError extends Error {
  response: Response;
  statusCode: number;
  status: string;
}

export class AppError extends Error {
  constructor(message?: string) {
    super(message);
  }
}