import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProviderService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository 
let listProviders: ListProviderService

describe('ShowProfile', () => {
  beforeEach(()  =>  {
    fakeUsersRepository = new FakeUsersRepository()
    listProviders  = new ListProviderService( fakeUsersRepository )
  })
  
  it('should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const userTwo = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456'
    })

    const loggedUser =  await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([
      userOne, 
      userTwo
    ])
  })
 
})