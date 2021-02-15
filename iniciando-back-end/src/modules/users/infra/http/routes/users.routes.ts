import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

// Middleware de autenticação
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

// Update Avatar Service
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

// SoC -> Separation of concerns

const usersRouter = Router()

// Upload do avatar
const upload = multer(uploadConfig)

// Responsabilidade da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

/* 
CONCEITOS
Repository 
services
*/

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService);
    

    const user = await createUser.execute({
        name,
        email,
        password
    })

    delete user.password

    return response.json(user)
})

// PATH -> Semelhante ao PUT, mas atualiza uma informação só, já o PUT atualiza várias
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)

})

export default usersRouter