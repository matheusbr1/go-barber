import { Router } from 'express'

import { celebrate, Joi, Segments } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/', 
  celebrate({
  [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }), 
profileController.update)

export default profileRouter