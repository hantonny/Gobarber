import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Gustavo Marcos',
      email: 'gustavoMarcos@gmail.com',
      password: '1234567'
    })


    const response = await authenticateUser.execute({
      email: 'gustavoMarcos@gmail.com',
      password: '1234567'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

});
