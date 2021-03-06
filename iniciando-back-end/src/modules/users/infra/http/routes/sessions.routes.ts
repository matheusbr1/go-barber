import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import SessionsController from '../controllers/SessionsController'

const SessionsRouter = Router()
const sessionsContainer = new SessionsController()

SessionsRouter.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), sessionsContainer.create)

export default SessionsRouter