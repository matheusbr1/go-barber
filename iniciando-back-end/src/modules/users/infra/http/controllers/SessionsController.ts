import  { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

import { classToClass } from 'class-transformer'

// Deve conter no máximo 5 métodos
// index, show, create , update, delete 

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authencateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authencateUser.execute({
        email,
        password
    })

    return response.json({ user: classToClass(user), token })
  }
}