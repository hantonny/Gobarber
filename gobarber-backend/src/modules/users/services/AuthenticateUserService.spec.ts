import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

  })
  it('should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
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

  it('should not be able to authenticate with non existing user', async () => {

    await expect(authenticateUser.execute({
      email: 'gustavoMarcos@gmail.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Gustavo Marcos',
      email: 'gustavoMarcos@gmail.com',
      password: '1234567'
    })

    await expect(authenticateUser.execute({
      email: 'gustavoMarcos@gmail.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);

  })

});
