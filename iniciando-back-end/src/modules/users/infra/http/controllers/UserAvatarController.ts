import  { Request, Response } from 'express'
import { container } from 'tsyringe'

// Update Avatar Service
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

// Deve conter no máximo 5 métodos
// index, show, create , update, delete 

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)
  }
}