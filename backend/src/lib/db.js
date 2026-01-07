import mongoose from 'mongoose';
import {ENV} from './env.js'

export const connectDB = async ()=>{
      if(!ENV.DB_URL){
            console.error('Database URL is not defined in environment variables.');
            process.exit(1);
      }
      try {
            const conn =await mongoose.connect(ENV.DB_URL);
            console.log('Database connected successfully :', conn.connection.host);
      } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1); // 0 means success, 1 means failure
      }
}