import { IUserData } from "../DTOs/IUserData";
import { User } from "../entities/User";

interface IUserRepository {
  list(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(data: IUserData): Promise<User>;
  delete(id: string): Promise<boolean>;
}

export { IUserRepository };
