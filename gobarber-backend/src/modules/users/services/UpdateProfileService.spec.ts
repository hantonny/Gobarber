import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })

    const updateUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Tre',
        email: 'jonhtre@gmail.com'
    })

    expect(updateUser.name).toBe('Jonh Tre');
    expect(updateUser.email).toBe('jonhtre@gmail.com');
  })
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })

    const user = await fakeUsersRepository.create({
        name: 'Test',
        email: 'test@gmail.com',
        password: '1234567'
    })

    await expect(
        updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Tre',
        email: 'jonh@gmail.com'
    }),
  ).rejects.toBeInstanceOf(AppError)
})
it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })

    const updateUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Tre',
        email: 'jonhtre@gmail.com',
        old_password: '1234567',
        password: '123123'
    })

    expect(updateUser.password).toBe('123123');
  })
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Tre',
        email: 'jonhtre@gmail.com',
        password: '123123'
    })).rejects.toBeInstanceOf(AppError)

  })
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        password: '1234567'
    })

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Tre',
        email: 'jonhtre@gmail.com',
        old_password: 'wrong old password',
        password: '123123'
    })).rejects.toBeInstanceOf(AppError)

  })
});
