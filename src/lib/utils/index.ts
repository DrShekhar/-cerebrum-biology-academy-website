import { logger as simpleLogger } from './logger'
import { productionLogger, ProductionLogger, type LogContext } from './productionLogger'

const isProduction = process.env.NODE_ENV === 'production'

export const logger = isProduction ? productionLogger : simpleLogger

export { ProductionLogger, type LogContext }

export default logger
