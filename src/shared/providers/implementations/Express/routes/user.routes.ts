import { Router } from "express";

import { CreateUserController } from "../../../../../modules/user/useCases/createUser/CreateUserController";
import { ListUsersController } from "../../../../../modules/user/useCases/listUsers/ListUsersController";

const userRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

userRouter.post("/", createUserController.handle);
userRouter.get("/", listUsersController.handle);

export { userRouter };
