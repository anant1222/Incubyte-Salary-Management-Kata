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

export async function updateEmployeeById(
  id: number,
  input: EmployeeCreationInput,
): Promise<Employee | null> {
  const employee = await Employee.findByPk(id);

  if (!employee) {
    return null;
  }

  await employee.update(input);
  return employee;
}
