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

export async function deleteEmployeeById(id: number): Promise<boolean> {
  const employee = await Employee.findByPk(id);

  if (!employee) {
    return false;
  }

  await employee.destroy();
  return true;
}

export async function findSalariesByCountry(
  country: string,
): Promise<number[]> {
  const records = await Employee.findAll({
    where: { country },
    attributes: ['salary'],
    raw: true,
  });

  return records.map((record) => record.salary as number);
}

export async function findSalariesByJobTitle(
  jobTitle: string,
): Promise<number[]> {
  const records = await Employee.findAll({
    where: { job_title: jobTitle },
    attributes: ['salary'],
    raw: true,
  });

  return records.map((record) => record.salary as number);
}
