import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, email, password } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const updatedUser = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
    });

    return response.status(200).json({ user: updatedUser });
  }
}

export { UpdateUserController };
