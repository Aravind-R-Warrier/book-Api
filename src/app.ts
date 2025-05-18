import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bookRoutes from './routes/book.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', bookRoutes);
app.use(errorHandler);

export default app;
