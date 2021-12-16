import { v4 as uuid } from "uuid";

class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(properties: Omit<User, "id">, id?: string) {
    Object.assign(this, properties);

    if (!id) {
      this.id = uuid();
    }
  }
}

export { User };
