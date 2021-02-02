import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import IUsersRepository from '@modules/users/repositories/IUserRepository'

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: User;
    token: string;
}

export default class AuthenticationUserService {

    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401)
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