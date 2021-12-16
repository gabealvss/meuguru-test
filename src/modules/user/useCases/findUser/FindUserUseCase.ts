import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id: string;
}

interface IResponse {
  user: User;
}

@injectable()
class FindUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        `Não foi possível encontrar o usuário com o ID ${id}.`,
        404
      );
    }

    return {
      user,
    };
  }
}

export { FindUserUseCase };
