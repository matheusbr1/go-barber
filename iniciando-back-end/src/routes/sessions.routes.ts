import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const SessionsRouter = Router()

SessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const authencateUser = new AuthenticateUserService()

    const { user, token } = await authencateUser.execute({
        email,
        password
    })

    delete user.password

    return response.json({ user, token })
})

export default SessionsRouter