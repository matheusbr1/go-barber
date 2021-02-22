import  { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'

// Deve conter no máximo 5 métodos
// index, show, create , update, delete 

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    // Exibição do pergil
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService);
    
    const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password
    })

    delete user.password

    return response.json(user)
  }
}