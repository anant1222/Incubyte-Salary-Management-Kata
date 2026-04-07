import app from './app';
import { connectDatabase, sequelize } from './config/database';

const port = Number(process.env.PORT) || 3000;

async function start(): Promise<void> {
  await connectDatabase();
  await sequelize.sync();

  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
}

start().catch((error: unknown) => {
  console.error('Failed to start server', error);
  process.exitCode = 1;
});
