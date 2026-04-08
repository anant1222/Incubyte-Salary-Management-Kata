import type { EmployeeCreationInput } from '../models/employee.model';
import { Employee } from '../models/employee.model';

export async function createEmployee(
  input: EmployeeCreationInput,
): Promise<Employee> {
  return Employee.create(input);
}

export async function findEmployeeById(
  id: number,
): Promise<Employee | null> {
  return Employee.findByPk(id);
}
