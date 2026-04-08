import * as employeeService from './employee.service';

export type EmployeeSalaryBreakdown = {
  employee_id: number;
  gross_salary: number;
  deduction: number;
  net_salary: number;
};

function deductionAmount(grossSalary: number, country: string): number {
  if (country === 'India') {
    return grossSalary * 0.1;
  }
  if (country === 'United States') {
    return grossSalary * 0.12;
  }
  return 0;
}

export async function getEmployeeSalaryBreakdown(
  employeeId: number,
): Promise<EmployeeSalaryBreakdown> {
  const employee = await employeeService.getEmployeeById(employeeId);
  const gross_salary = employee.salary;
  const deduction = deductionAmount(gross_salary, employee.country);
  const net_salary = gross_salary - deduction;

  return {
    employee_id: employee.id,
    gross_salary,
    deduction,
    net_salary,
  };
}
