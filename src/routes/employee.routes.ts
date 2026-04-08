import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';
import { validateBody, validateParams } from '../middlewares/validate.middleware';
import {
  createEmployeeBodySchema,
  getEmployeeByIdParamsSchema,
  updateEmployeeBodySchema,
} from '../validations/employee.validation';

const router = Router();

router.post(
  '/',
  validateBody(createEmployeeBodySchema),
  employeeController.createEmployee,
);

router.get(
  '/:id/salary',
  validateParams(getEmployeeByIdParamsSchema),
  employeeController.getEmployeeSalary,
);

router.get(
  '/:id',
  validateParams(getEmployeeByIdParamsSchema),
  employeeController.getEmployeeById,
);

router.put(
  '/:id',
  validateParams(getEmployeeByIdParamsSchema),
  validateBody(updateEmployeeBodySchema),
  employeeController.updateEmployee,
);

router.delete(
  '/:id',
  validateParams(getEmployeeByIdParamsSchema),
  employeeController.deleteEmployee,
);

export default router;
