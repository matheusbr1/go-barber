import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const SessionsRouter = Router()

SessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body

        const authencateUser = new AuthenticateUserService()

        const { user, token } = await authencateUser.execute({
            email,
            password
        })

        delete user.password

        return response.json({ user, token })

    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

export default SessionsRouter