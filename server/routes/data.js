import { Router } from 'express'
import { Messages, Schedules, Stations, Users } from '../controllers'

const router = Router()

router.get('/schedules/available', Schedules.getAvailableDates)
router.get('/stations', Stations.get)

router.post('/users', Users.create)
router.post('/message', Messages.create)
router.post('/schedules', Schedules.create)

export default router
