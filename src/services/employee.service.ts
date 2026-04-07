import type {
  EmployeeAttributes,
  EmployeeCreationInput,
} from '../models/employee.model';
import * as employeeRepository from '../repositories/employee.repository';

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
