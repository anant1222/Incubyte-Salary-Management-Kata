import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { createEmployeeBodySchema } from '../validations/employee.validation';

const router = Router();

router.post(
  '/',
  validateBody(createEmployeeBodySchema),
  employeeController.createEmployee,
);

export default router;
