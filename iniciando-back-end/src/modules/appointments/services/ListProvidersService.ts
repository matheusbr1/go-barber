import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUserRepository'

interface IRequest {
    user_id: string
}

@injectable()
export default class ListProviderService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
      const users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      })

      return users
  }
}