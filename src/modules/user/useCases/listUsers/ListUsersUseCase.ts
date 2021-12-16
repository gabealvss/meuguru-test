import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  page?: number;
}

interface IResponse {
  users: User[];
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ page }: IRequest): Promise<IResponse> {
    const users = await this.userRepository.list(page);

    return {
      users,
    };
  }
}

export { ListUsersUseCase };
