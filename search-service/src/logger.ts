import pino from 'pino'
import { type LoggerOptions } from 'pino'

const options: LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
}

if (process.env.NODE_ENV !== 'production') {
    options.transport = {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    }
}

const logger = pino(options)

export default logger
