import { container } from "tsyringe";

import { InMemoryUserRepository } from "../../modules/user/repositories/implementations/InMemoryUserRepository";
import { UserRepository } from "../../modules/user/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  InMemoryUserRepository
);
