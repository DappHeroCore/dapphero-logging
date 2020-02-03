import { Router } from 'express';
import * as controllers from './controllers'

const router = Router()
//
router.get('/', controllers.log.postLogs)
// Log Routes
router.post('/log', controllers.log.postLogs)

export default router
