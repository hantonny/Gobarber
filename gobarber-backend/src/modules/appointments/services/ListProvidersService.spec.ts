import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  })
  it('should be able to list the providers', async () => {
   const user1 = await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })
    const user2 = await fakeUsersRepository.create({
        name: 'Jonh Tre',
        email: 'jonhtre@gmail.com',
        password: '1234567'
    })

    const loggedUser = await fakeUsersRepository.create({
        name: 'Jonh Qua',
        email: 'jonhqua@gmail.com',
        password: '1234567'
    })


    const providers = await listProviders.execute({
        user_id: loggedUser.id
    })

    expect(providers).toEqual([
        user1, user2
    ]);
  })
});