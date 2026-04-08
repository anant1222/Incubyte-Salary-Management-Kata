import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import type {
  EmployeeAttributes,
  EmployeeCreationInput,
} from '../models/employee.model';
import { Employee } from '../models/employee.model';
import * as employeeRepository from '../repositories/employee.repository';
import { HttpError } from '../utils/http-error';

function toEmployeeAttributes(model: Employee): EmployeeAttributes {
  return {
    id: model.id,
    full_name: model.full_name,
    job_title: model.job_title,
    country: model.country,
    salary: model.salary,
  };
}

export async function createEmployee(
  input: EmployeeCreationInput,
): Promise<EmployeeAttributes> {
  const created = await employeeRepository.createEmployee(input);
  return toEmployeeAttributes(created);
}

export async function getEmployeeById(id: number): Promise<EmployeeAttributes> {
  const employee = await employeeRepository.findEmployeeById(id);

  if (!employee) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.EMPLOYEE_NOT_FOUND);
  }

  return toEmployeeAttributes(employee);
}

export async function updateEmployee(
  id: number,
  input: EmployeeCreationInput,
): Promise<EmployeeAttributes> {
  const employee = await employeeRepository.updateEmployeeById(id, input);

  if (!employee) {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.EMPLOYEE_NOT_FOUND);
  }

  return toEmployeeAttributes(employee);
}
