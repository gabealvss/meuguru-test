import { IUserData } from "../../DTOs/IUserData";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async list(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async save(data: IUserData): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    const user = this.users.findIndex((user) => user.id === id);

    this.users.splice(user, 1);

    return true;
  }
}

export { InMemoryUserRepository };
