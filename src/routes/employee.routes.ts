import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';
import { validateBody, validateParams } from '../middlewares/validate.middleware';
import {
  createEmployeeBodySchema,
  getEmployeeByIdParamsSchema,
} from '../validations/employee.validation';

const router = Router();

router.post(
  '/',
  validateBody(createEmployeeBodySchema),
  employeeController.createEmployee,
);

router.get(
  '/:id', validateParams(getEmployeeByIdParamsSchema), employeeController.getEmployeeById,
);

export default router;
