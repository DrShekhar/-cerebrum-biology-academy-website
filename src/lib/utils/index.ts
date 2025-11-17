import { logger as simpleLogger, Logger } from './logger'
import { productionLogger, ProductionLogger, type LogContext } from './productionLogger'

const isProduction = process.env.NODE_ENV === 'production'

export const logger: Logger | ProductionLogger = isProduction ? productionLogger : simpleLogger

export { ProductionLogger, type LogContext, Logger }

export default logger
