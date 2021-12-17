import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        `Não foi possível encontrar o usuário com o ID ${id}.`,
        500
      );
    }

    const updatedUser = await this.userRepository.update({
      id,
      name: name || user.name,
      email: email || user.email,
      password: (await hash(password, 8)) || user.password,
    });

    return updatedUser;
  }
}

export { UpdateUserUseCase };
