import { Router } from "express";

import { CreateUserController } from "../../../../../modules/user/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../../../modules/user/useCases/deleteUser/DeleteUserController";
import { FindUserController } from "../../../../../modules/user/useCases/findUser/FindUserController";
import { ListUsersController } from "../../../../../modules/user/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../../../../../modules/user/useCases/updateUser/UpdateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserController = new FindUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

userRouter.post("/", createUserController.handle);
userRouter.get("/", listUsersController.handle);
userRouter.delete("/", deleteUserController.handle);
userRouter.patch("/", updateUserController.handle);

export { userRouter };
