import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        `Não foi possível encontrar um usuário com o ID ${id}.`,
        404
      );
    }

    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
