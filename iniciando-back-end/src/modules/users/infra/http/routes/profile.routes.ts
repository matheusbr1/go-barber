import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'

// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter