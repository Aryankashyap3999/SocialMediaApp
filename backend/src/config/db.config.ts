import mongoose from "mongoose";
import { serverConfig } from ".";
import logger from "./logger.config";


export const connectDb = async () => {
    try {
        const url = serverConfig.DB_URL;
        await mongoose.connect(url);
        logger.info("Connected to the database successfully");


        mongoose.connection.on('error', (err) => {
            logger.error(`Database connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {  
            logger.warn('Database disconnected');       
        });

        process.on("SIGINT", async () => {      
            await mongoose.connection.close();
            logger.info("MongoDB connection closed due to application termination");
            process.exit(0);
        });
    } catch (error) {
        logger.error("Error connecting to the database", error);    
        process.exit(1);
    }
}