import { HTTP_STATUS } from '../constants/http-status';
import { MESSAGES } from '../constants/messages';
import * as employeeRepository from '../repositories/employee.repository';
import { HttpError } from '../utils/http-error';

export type CountrySalaryMetrics = {
  country: string;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
};

export async function getCountrySalaryMetrics(
  country: string,
): Promise<CountrySalaryMetrics> {
  const salaries = await employeeRepository.findSalariesByCountry(country);

  if (salaries.length === 0) {
    throw new HttpError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.NO_EMPLOYEES_FOR_COUNTRY,
    );
  }

  const min_salary = Math.min(...salaries);
  const max_salary = Math.max(...salaries);
  const sum = salaries.reduce((total, salary) => total + salary, 0);
  const avg_salary = sum / salaries.length;

  return { country, min_salary, max_salary, avg_salary };
}
