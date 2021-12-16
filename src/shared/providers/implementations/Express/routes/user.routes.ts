import { Router } from "express";

import { CreateUserController } from "../../../../../modules/user/useCases/createUser/CreateUserController";
import { FindUserController } from "../../../../../modules/user/useCases/findUser/FindUserController";
import { ListUsersController } from "../../../../../modules/user/useCases/listUsers/ListUsersController";

const userRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserController = new FindUserController();

userRouter.post("/", createUserController.handle);
userRouter.get("/", listUsersController.handle);
userRouter.get("/:id", findUserController.handle);

export { userRouter };
