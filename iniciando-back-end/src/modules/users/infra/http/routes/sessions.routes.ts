import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const SessionsRouter = Router()

SessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const authencateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authencateUser.execute({
        email,
        password
    })

    delete user.password

    return response.json({ user, token })
})

export default SessionsRouter