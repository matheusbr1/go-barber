import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ProfileController from '../controllers/ProfileController'
import UserAvatarController from '../controllers/UserAvatarController'

// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.post('/', profileController.update)

export default profileRouter