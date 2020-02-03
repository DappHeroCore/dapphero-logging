import { winstonLogger } from '../logging/logger'
import { RequestHandler } from 'express'

export const postLogs: RequestHandler = (req, res) => {
  let message
  try {
    message = JSON.stringify(req.body.message)
  } catch {
    winstonLogger.info('JSON.stringify failed')
    message = req.body.message.toSring()
  }
  const level = req.body?.level ?? 'debug'
  winstonLogger.log(level, message)
  res.send()
}
