import type { Response } from 'express';

export type ApiResponse<T extends object = object> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};

export function sendSuccess<T extends object>(
  res: Response,
  message: string,
  statusCode: number,
  data: T,
): void {
  const body: ApiResponse<T> = {
    success: true,
    message,
    statusCode,
    data,
  };
  res.status(statusCode).json(body);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number,
  data: object = {},
): void {
  const body: ApiResponse<object> = {
    success: false,
    message,
    statusCode,
    data,
  };
  res.status(statusCode).json(body);
}
