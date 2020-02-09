import { RequestHandler } from 'express'
import { winstonLogger } from '../logging/logger'

export const postLogs: RequestHandler = (req, res) => {
  try {
    const message = req.body
    const level = req.body?.level ?? 'debug'
    winstonLogger.log(level, message)
    res.send()
  } catch (err) {
    console.log(err)
  }
}
