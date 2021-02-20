import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Lucas Martins',
      email: 'lucasMartins@gmail.com',
      password: '1234567'
    })

    expect(user).toHaveProperty('id');
  })

  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Lucas Martins',
      email: 'lucasMartins@gmail.com',
      password: '1234567'
    })

    expect(createUser.execute({
      name: 'Lucas Martins',
      email: 'lucasMartins@gmail.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  })

});
