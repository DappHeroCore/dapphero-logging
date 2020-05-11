import { RequestHandler } from 'express'
import { winstonLogger } from '../logging/logger'
import * as models from '../models'

export const postLogs: RequestHandler = (req, res) => {
  try {
    const message = req.body
    const level = req.body?.level ?? 'info'
    winstonLogger.log(level, message)
    models.logglyLogs.addLogsToDb(message)
    res.send()
  } catch (err) {
    console.log(err)
  }
}
