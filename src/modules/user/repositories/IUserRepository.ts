import { IUpdatedUserData } from "../DTOs/IUpdatedUserData";
import { IUserData } from "../DTOs/IUserData";
import { User } from "../entities/User";

interface IUserRepository {
  list(page: number): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(data: IUserData): Promise<User>;
  update(data: IUpdatedUserData): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
