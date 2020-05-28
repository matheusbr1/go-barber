import User from '../models/User'
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

interface Request {
    name: string,
    email: string,
    password: string
}

class createUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User)

        const checkUserExists = await userRepository.findOne({
            where: { email },
        })

        if (checkUserExists) {
            throw new Error('Email adress already used.')
        }

        const hashedPassword = await hash(password, 8)

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        })

        await userRepository.save(user)

        return user
    }
}

export default createUserService;