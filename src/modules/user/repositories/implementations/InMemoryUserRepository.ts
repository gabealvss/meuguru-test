import { hash } from "bcrypt";

import { AppError } from "../../../../errors/AppError";
import { IUpdatedUserData } from "../../DTOs/IUpdatedUserData";
import { IUserData } from "../../DTOs/IUserData";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async list(page: number): Promise<User[]> {
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

  async findByName(name: string, page: number): Promise<User[]> {
    const user = this.users.filter((user) => user.name === name);

    return user;
  }

  async save(data: IUserData): Promise<User> {
    const user = new User({
      name: data.name,
      email: data.email,
      password: await hash(data.password, 8),
    });

    this.users.push(user);
    return user;
  }

  async update(data: IUpdatedUserData): Promise<User> {
    const user = this.users.find((user) => user.id === data.id);
    const index = this.users.findIndex((user) => user.id === data.id);

    if (!user) {
      throw new AppError(
        `Unable to find a user with id ${data.id} to update.`,
        500
      );
    }

    const updatedUser = new User(
      {
        name: data.name || user.name,
        email: data.email || user.email,
        password: (await hash(data.password, 8)) || user.password,
      },
      data.id
    );

    this.users.splice(index, 1, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const user = this.users.findIndex((user) => user.id === id);

    this.users.splice(user, 1);
  }
}

export { InMemoryUserRepository };
