import { Router } from 'express';
import * as controllers from './controllers'
const router = Router()
//
router.get('/health', (req, res) => {
  res.send('OK')
})
// Log Routes
router.post('/log', controllers.log.postLogs)

router.get('/', (req, res) => {
  res.send('OK')
})

export default router
