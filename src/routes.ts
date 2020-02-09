import { Router } from 'express';
import * as controllers from './controllers'
import { winstonLogger } from './logging/logger'
const router = Router()
//
router.get('/', (req, res) => {
  res.send('OK')
})
// Log Routes
router.post('/log', controllers.log.postLogs)

export default router
