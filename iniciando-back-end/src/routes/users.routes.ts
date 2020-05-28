import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/CreateUserService'

// Middleware de autenticação
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

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
    try {
        const { name, email, password } = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        })

        delete user.password

        return response.json(user)


    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

// PATH -> Semelhante ao PUT, mas atualiza uma informação só, já o PUT atualiza várias
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    console.log(request.file)

    return response.json({ ok: true })
})

export default usersRouter