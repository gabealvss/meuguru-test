import { container } from "tsyringe";

import { UserRepository } from "../../modules/user/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";
import { IValidator } from "../../shared/providers/IValidator";
import { RequestValidator } from "../../shared/providers/implementations/RequestValidator";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IValidator>(
  "RequestValidator",
  RequestValidator
);