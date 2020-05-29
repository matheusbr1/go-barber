import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/CreateUserService'

// Middleware de autenticação
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

// Update Avatar Service
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

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

    const createUser = new CreateUserService();

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

    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)

})

export default usersRouter