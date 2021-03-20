import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateUserAvatar

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);
  })
  it('should be able to create a new avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hellyas',
      email: 'hellyas@gmail.com',
      password: 'password',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg');
  })

  it('should not be able to update avatarfrom non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-users',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should delete old avatar when updating new one', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Hellyas',
      email: 'hellyas@gmail.com',
      password: 'password',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  })

});
