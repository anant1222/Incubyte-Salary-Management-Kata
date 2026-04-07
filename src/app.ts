import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import healthRoutes from './routes/health.routes';

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
