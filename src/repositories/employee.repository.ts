import type { EmployeeCreationAttributes } from '../models/employee.model';
import { Employee } from '../models/employee.model';

export async function create(
  attributes: EmployeeCreationAttributes,
): Promise<Employee> {
  return Employee.create(attributes);
}
