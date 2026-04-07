import { ValidationError } from 'joi';
import type { ErrorRequestHandler } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import { sendError } from '../utils/api-response';
import { HttpError } from '../utils/http-error';

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req,
  res,
  next,
): void => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof HttpError) {
    sendError(res, err.message, err.statusCode, err.data);
    return;
  }

  if (err instanceof ValidationError) {
    const message = err.details.map((d) => d.message).join('; ');
    sendError(res, message, HTTP_STATUS.BAD_REQUEST, {});
    return;
  }

  sendError(res, MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR, {});
};
