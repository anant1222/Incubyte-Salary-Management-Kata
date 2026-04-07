import type { EmployeeCreationInput } from '../models/employee.model';
import { Employee } from '../models/employee.model';

export async function createEmployee(
  input: EmployeeCreationInput,
): Promise<Employee> {
  return Employee.create(input);
}
