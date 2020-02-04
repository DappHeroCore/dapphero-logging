import { RequestHandler } from 'express'
import { winstonLogger } from '../logging/logger'

export const postLogs: RequestHandler = (req, res) => {
  const rawMessage = req.body.message
  let message
  try {
    message = JSON.stringify(rawMessage)
  } catch {
    winstonLogger.info('JSON.stringify failed')
    message = typeof rawMessage === 'string' ? rawMessage : rawMessage.toSring()
  }
  const level = req.body?.level ?? 'debug'
  winstonLogger.log(level, message)

  res.send()
}

winstonLogger.log('info', 'postLogs controller loaded', new Date().toString())