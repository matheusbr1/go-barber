import { Router } from 'express'

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const SessionsRouter = Router()

SessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const authencateUser = new AuthenticateUserService(usersRepository)

    const { user, token } = await authencateUser.execute({
        email,
        password
    })

    delete user.password

    return response.json({ user, token })
})

export default SessionsRouter