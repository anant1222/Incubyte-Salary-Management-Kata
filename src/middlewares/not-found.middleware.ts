import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import { sendError } from '../utils/api-response';

export function notFoundMiddleware(_req: Request, res: Response): void {
  sendError(res, MESSAGES.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND, {});
}
