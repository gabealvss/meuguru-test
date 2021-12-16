import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userCheck = await this.userRepository.findByEmail(email);

    if (userCheck) {
      throw new AppError(
        `Já existe uma conta cadastrada para o e-mail ${email}.`,
        500
      );
    }

    if (!password || password.length < 8) {
      throw new AppError("Sua senha precisa ter 8 ou mais caracteres.", 400);
    }

    const user = await this.userRepository.save({
      name,
      email,
      password,
    });

    return user;
  }
}

export { CreateUserUseCase };
