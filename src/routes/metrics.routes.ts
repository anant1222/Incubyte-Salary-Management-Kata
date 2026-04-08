import { Router } from 'express';
import * as metricsController from '../controllers/metrics.controller';
import { validateQuery } from '../middlewares/validate.middleware';
import { countryMetricsQuerySchema } from '../validations/metrics.validation';

const router = Router();

router.get(
  '/country',
  validateQuery(countryMetricsQuerySchema),
  metricsController.getCountrySalaryMetrics,
);

export default router;
