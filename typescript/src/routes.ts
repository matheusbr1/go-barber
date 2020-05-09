import { Request, Response } from 'express'

import createUser from './services/CreateUser'

export function helloWord(request: Request, response: Response) {

    const user = createUser({
        email: 'matheuabaron10@gmail.com',
        password: 'asdf',
        techs: ['NodeJs', 'ReactJs', { title: 'Js', experience: 100 }]
    })

    console.log(user.email)

    response.json({ message: 'Hello' })
}