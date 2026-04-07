import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

const defaultStorage = path.join(__dirname, '../../data/database.sqlite');

const storage =
  process.env.DATABASE_STORAGE ??
  (process.env.NODE_ENV === 'test' ? ':memory:' : defaultStorage);

if (storage !== ':memory:') {
  fs.mkdirSync(path.dirname(storage), { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging:
    process.env.NODE_ENV === 'development' ? console.log.bind(console) : false,
});

export async function connectDatabase(): Promise<void> {
  await sequelize.authenticate();
}
