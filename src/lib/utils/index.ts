import { logger as simpleLogger, Logger } from './logger'
import { productionLogger, ProductionLogger, type LogContext } from './productionLogger'

const isProduction = process.env.NODE_ENV === 'production'

const logger: Logger | ProductionLogger = isProduction ? productionLogger : simpleLogger

export { logger, ProductionLogger, type LogContext, Logger }
export default logger
