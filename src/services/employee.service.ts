import type { EmployeeCreationAttributes } from '../models/employee.model';
import * as employeeRepository from '../repositories/employee.repository';

export type CreateEmployeePayload = Pick<
  EmployeeCreationAttributes,
  'full_name' | 'job_title' | 'country' | 'salary'
>;

export async function createEmployee(
  payload: CreateEmployeePayload,
): Promise<EmployeeCreationAttributes & { id: number }> {
  const employee = await employeeRepository.create(payload);
  return {
    id: employee.id,
    full_name: employee.full_name,
    job_title: employee.job_title,
    country: employee.country,
    salary: employee.salary,
  };
}
