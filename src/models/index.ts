import './employee.model';
import { sequelize } from '../config/database';

export { sequelize };
export { Employee } from './employee.model';
export type {
  EmployeeAttributes,
  EmployeeCreationAttributes,
  EmployeeCreationInput,
} from './employee.model';
