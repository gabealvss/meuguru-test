import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  page?: number;
  name?: string;
  email?: string;
  id?: string;
}

interface IResponse {
  users: User[] | User;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ page, name, email, id }: IRequest): Promise<IResponse> {
    if (typeof name !== "undefined") {
      const users = await this.userRepository.findByName(name, page);

      return {
        users,
      };
    }

    if (typeof email !== "undefined") {
      const users = await this.userRepository.findByEmail(email);

      if (!users) {
        return {
          users: [],
        };
      }

      return {
        users,
      };
    }

    if (typeof id !== "undefined") {
      const users = await this.userRepository.findById(id);

      if (!users) {
        return {
          users: [],
        };
      }

      return {
        users,
      };
    }

    const users = await this.userRepository.list(page);
    return {
      users,
    };
  }
}

export { ListUsersUseCase };
