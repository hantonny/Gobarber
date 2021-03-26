import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '1234567',
      provider_id: '1234567'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');
  })

  it('should not be able to create a new appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '1234567',
      provider_id: '1234567'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '1234567',
        provider_id: '1234567'
      })

    ).rejects.toBeInstanceOf(AppError)

  })
});
