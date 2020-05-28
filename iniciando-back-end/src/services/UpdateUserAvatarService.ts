import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import User from '../models/User'
import uploadConfig from '../config/upload'
import usersRouter from '../routes/users.routes'

interface Request {
    user_id: string,
    avatarFilename: string
}

export default class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(user_id)

        if (!user) {
            throw new Error('Only authenticated users can change avatar')
        }

        if (user.avatar) {
            //  Deletar avatar anterior

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            // Deleta o avatar anterior caso ele exista
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await userRepository.save(user)

        return user
    }
}