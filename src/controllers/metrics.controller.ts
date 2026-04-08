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
    const { name: country } = req.query as { name: string };
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

export async function getJobTitleSalaryMetrics(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { title: jobTitle } = req.query as { title: string };
    const jobSalaryMetrics =
      await metricsService.getJobTitleSalaryMetrics(jobTitle);

    sendSuccess(
      res,
      MESSAGES.JOB_METRICS_FETCHED,
      HTTP_STATUS.OK,
      jobSalaryMetrics,
    );
  } catch (error) {
    next(error);
  }
}
