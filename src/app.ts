import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import authRoutes from './routes/authRoutes';  // New import for auth routes
import logger from './middleware/logger';
import morgan from 'morgan';
import { expressjwt } from 'express-jwt'; 
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swaggerConfig';

dotenv.config();

const app = express();

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// HTTP request logger
app.use(morgan('dev'));

// Custom logger middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// JWT middleware to protect routes
const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET || 'secret',
  algorithms: ['HS256'],
}).unless({
  path: [
    '/api/auth/register', // Exclude register route from JWT protection
    '/api/auth/login',    // Exclude login route from JWT protection
    '/api/health'         // Exclude health route from JWT protection
  ],
});

// Apply JWT middleware
app.use(jwtMiddleware);

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/v1', routes);        // Application routes

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Service is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
  } else {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
