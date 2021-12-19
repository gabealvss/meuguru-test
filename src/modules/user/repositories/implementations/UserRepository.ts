import { hash } from "bcrypt";

import { PrismaClient } from "@prisma/client";

import { IUpdatedUserData } from "../../DTOs/IUpdatedUserData";
import { IUserData } from "../../DTOs/IUserData";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async list(page: number): Promise<User[]> {
    const users = await this.client.users.findMany({
      skip: 7 * page,
      take: 7,
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    });

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.client.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.client.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByName(name: string, page: number): Promise<User[]> {
    const user = await this.client.users.findMany({
      where: {
        name,
      },
      skip: 7 * page,
      take: 7,
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    });

    return user;
  }

  async save(data: IUserData): Promise<User> {
    const user = new User({
      name: data.name,
      email: data.email,
      password: await hash(data.password, 8),
    });

    await this.client.users.create({
      data: {
        ...user,
      },
    });

    return user;
  }

  async update(data: IUpdatedUserData): Promise<User> {
    const updatedUser = new User(
      {
        name: data.name,
        email: data.email,
        password: await hash(data.password, 8),
      },
      data.id
    );

    await this.client.users.update({
      where: {
        id: data.id,
      },
      data: {
        ...updatedUser,
      },
    });

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.client.users.delete({
      where: {
        id,
      },
    });
  }
}

export { UserRepository };
