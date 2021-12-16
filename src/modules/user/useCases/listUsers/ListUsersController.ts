import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const pagination = parseInt(page as string, 10) || 0;

    const listUsersUseCase = container.resolve(ListUsersUseCase);
    const users = await listUsersUseCase.execute({ page: pagination });

    return response.status(200).json(users);
  }
}

export { ListUsersController };
