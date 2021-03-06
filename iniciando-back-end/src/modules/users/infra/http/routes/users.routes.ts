import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import { celebrate, Joi, Segments } from 'celebrate'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

// Upload do avatar
const upload = multer(uploadConfig)

usersRouter.post('/',  celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersController.create)

// PATH -> Semelhante ao PUT, mas atualiza uma informação só, já o PUT atualiza várias
usersRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    userAvatarController.update
)

export default usersRouter