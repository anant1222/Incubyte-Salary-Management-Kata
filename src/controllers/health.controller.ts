import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import * as healthService from '../services/health.service';
import { sendSuccess } from '../utils/api-response';

export function healthCheck(_req: Request, res: Response): void {
  const data = healthService.getHealthPayload();
  sendSuccess(res, MESSAGES.HEALTH_SUCCESS, HTTP_STATUS.OK, data);
}
