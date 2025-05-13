import { Router } from "express";
import { deleteUser, login, signup } from "../controllers/userController";
import verifyUser from "../middlewares/auth";

const userRouter = Router()

userRouter.post('/login',login)
userRouter.post('/signup',signup)
userRouter.post('/delete',verifyUser,deleteUser)

export default userRouter;