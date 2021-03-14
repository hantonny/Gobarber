import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  })

  it('should be to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    })

    expect(sendMail).toHaveBeenCalled();
  })
  it('should not be able to recover a non-existing user password', async() => {

    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    })).rejects.toBeInstanceOf(AppError)
  })
  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    })

    expect(generateToken).toHaveBeenCalled();
  })
});
