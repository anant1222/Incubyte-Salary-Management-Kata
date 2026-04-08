import './models';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import employeeRoutes from './routes/employee.routes';
import healthRoutes from './routes/health.routes';
import metricsRoutes from './routes/metrics.routes';

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/employees', employeeRoutes);
app.use('/metrics', metricsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
