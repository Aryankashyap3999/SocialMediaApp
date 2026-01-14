import winston from 'winston';

const isDevelopment = import.meta.env.MODE === 'development';

// Define custom format for logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack, ...metadata }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    
    if (Object.keys(metadata).length > 0) {
      log += ` ${JSON.stringify(metadata, null, 2)}`;
    }
    
    if (stack) {
      log += `\n${stack}`;
    }
    
    return log;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: customFormat,
  defaultMeta: { service: 'aptoodate-frontend' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      ),
    }),
    
    // Error log file (only in browser, we log to console)
    // In production, you might want to send logs to a backend service
  ],
});

// Custom log methods for the app
export const log = {
  info: (message: string, metadata?: Record<string, unknown>) => {
    logger.info(message, metadata);
  },
  error: (message: string, error?: Error | unknown, metadata?: Record<string, unknown>) => {
    if (error instanceof Error) {
      logger.error(message, { error: error.message, stack: error.stack, ...metadata });
    } else {
      logger.error(message, metadata);
    }
  },
  warn: (message: string, metadata?: Record<string, unknown>) => {
    logger.warn(message, metadata);
  },
  debug: (message: string, metadata?: Record<string, unknown>) => {
    logger.debug(message, metadata);
  },
};

export default logger;
