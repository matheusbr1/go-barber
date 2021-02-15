import { Router } from 'express'

import AppointmentsController from '../controllers/AppointmentController'

// Middleware of authentication
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// SoC -> Separation of concerns

const appointmentsRouter = Router()
const appointmentsControllers = new AppointmentsController()

// Apply middleware on all routes
appointmentsRouter.use(ensureAuthenticated)

// Routes
appointmentsRouter.post('/', appointmentsControllers.create)

export default appointmentsRouter