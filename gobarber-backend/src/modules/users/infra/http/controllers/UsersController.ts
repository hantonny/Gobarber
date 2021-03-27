import { Request, Response } from 'express';
import { classToClass } from 'class-transformer'

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createuser = container.resolve(CreateUserService);

    const user = await createuser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
