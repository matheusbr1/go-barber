import { Router } from 'express'

import ProvidersController from '../controllers/ProvidersController'

// Middleware of authentication
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// SoC -> Separation of concerns

const providersRouter = Router()
const providersControllers = new ProvidersController()

// Apply middleware on all routes
providersRouter.use(ensureAuthenticated)

// Routes
providersRouter.get('/', providersControllers.index)

export default providersRouter