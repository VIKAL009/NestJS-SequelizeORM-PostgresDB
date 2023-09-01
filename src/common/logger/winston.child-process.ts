import * as fs from 'fs'
import * as path from 'path'
import { Logger, createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logDirectory = 'logs'

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const fileRotateTransport = new DailyRotateFile({
  filename: path.join(logDirectory, 'error-%DATE%', 'error-%DATE%.log'),
  auditFile: path.join(logDirectory, 'audit.log'),

  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '5d',
})

const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // Log to console
    new transports.Console(),

    // Log to file
    fileRotateTransport,
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }),
  ],
})

process.on('message', (message) => {
  if (message['type'] === 'info') {
    logger.info({ message: message['message'], processId: process.pid, ppID: process.ppid })
  } else if (message['type'] === 'error') {
    logger.error({ message: message['message'], processID: process.pid, ppID: process.ppid })
  }
})
