// Importando as funções do express pra usar no middleware
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import appError from '@shared/errors/AppError'

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    interface TokenPayload {
        iat: number,
        exp: number,
        sub: string
    }

    if (!authHeader) {
        throw new appError('JWT token is missing', 401)
    }

    // Separando o token, porque ele vem "Bearer token"
    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret)

        const { sub } = decoded as TokenPayload

        request.user = {
            id: sub
        }

        return next()

    } catch (err) {
        throw new appError('Invalid JWT token', 401)
    }
}