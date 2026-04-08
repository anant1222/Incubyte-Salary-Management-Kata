import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import * as metricsService from '../services/metrics.service';
import { sendSuccess } from '../utils/api-response';

export async function getCountrySalaryMetrics(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const country = String(req.query.name);
    const metrics = await metricsService.getCountrySalaryMetrics(country);

    sendSuccess(
      res,
      MESSAGES.COUNTRY_METRICS_FETCHED,
      HTTP_STATUS.OK,
      metrics,
    );
  } catch (error) {
    next(error);
  }
}
