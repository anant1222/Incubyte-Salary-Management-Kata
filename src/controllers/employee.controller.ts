import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import * as employeeService from '../services/employee.service';
import { sendSuccess } from '../utils/api-response';

export async function createEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const employee = await employeeService.createEmployee(req.body);
    sendSuccess(
      res,
      MESSAGES.EMPLOYEE_CREATED,
      HTTP_STATUS.CREATED,
      employee,
    );
  } catch (error) {
    next(error);
  }
}
