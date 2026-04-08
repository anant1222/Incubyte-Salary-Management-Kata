import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface EmployeeAttributes {
  id: number;
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, 'id'>;


export type EmployeeCreationInput = Omit<EmployeeAttributes, 'id'>;

export class Employee extends Model<
  EmployeeAttributes,
  EmployeeCreationAttributes
> {
  declare id: number;
  declare full_name: string;
  declare job_title: string;
  declare country: string;
  declare salary: number;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    underscored: false,
  },
);
