import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

// Middleware of authentication
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

// Apply middleware on all routes
appointmentsRouter.use(ensureAuthenticated)

// Routes
appointmentsRouter.post('/',  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.string()
    }
  }), appointmentsController.create)

appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter