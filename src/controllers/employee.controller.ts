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

export async function getEmployeeById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const employee = await employeeService.getEmployeeById(id);
    sendSuccess(
      res,
      MESSAGES.EMPLOYEE_FETCHED,
      HTTP_STATUS.OK,
      employee,
    );
  } catch (error) {
    next(error);
  }
}

export async function updateEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const employee = await employeeService.updateEmployee(id, req.body);
    sendSuccess(
      res,
      MESSAGES.EMPLOYEE_UPDATED,
      HTTP_STATUS.OK,
      employee,
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = Number(req.params.id);
    await employeeService.deleteEmployee(id);
    sendSuccess(
      res,
      MESSAGES.EMPLOYEE_DELETED,
      HTTP_STATUS.OK,
      {},
    );
  } catch (error) {
    next(error);
  }
}
