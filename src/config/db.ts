import mongoose from 'mongoose';
import logger from '../middleware/logger';

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error: ${err.message}`);
    } else {
      logger.error('Unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
