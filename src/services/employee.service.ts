import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import type {
  EmployeeAttributes,
  EmployeeCreationInput,
} from '../models/employee.model';
import * as employeeRepository from '../repositories/employee.repository';
import { HttpError } from '../utils/http-error';

export async function createEmployee(
  input: EmployeeCreationInput,
): Promise<EmployeeAttributes> {
  const created = await employeeRepository.createEmployee(input);

  return {
    id: created.id,
    full_name: created.full_name,
    job_title: created.job_title,
    country: created.country,
    salary: created.salary,
  };
}

export async function getEmployeeById(id: number): Promise<EmployeeAttributes> {
  const row = await employeeRepository.findEmployeeById(id);

  if (!row) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.EMPLOYEE_NOT_FOUND);
  }

  return {
    id: row.id,
    full_name: row.full_name,
    job_title: row.job_title,
    country: row.country,
    salary: row.salary,
  };
}
