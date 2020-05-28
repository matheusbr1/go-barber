import User from '../models/User'
import authConfig from '../config/auth'
import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface Request {
    email: string,
    password: string
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticationUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({
            where: { email }
        })

        if (!user) {
            throw new Error('Incorrect email/password combination.')
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.')
        }

        // Usuário autenticado

        // Params: Payload, Key, configs of token
        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })


        return { user, token }
    }
}