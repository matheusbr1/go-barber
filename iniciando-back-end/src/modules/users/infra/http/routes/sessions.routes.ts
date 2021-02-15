import { Router } from 'express'

import SessionsController from '../controllers/SessionsController'

const SessionsRouter = Router()
const sessionsContainer = new SessionsController()

SessionsRouter.post('/', sessionsContainer.create)

export default SessionsRouter