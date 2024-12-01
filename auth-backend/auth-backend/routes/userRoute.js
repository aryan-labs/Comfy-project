import express from "express";
import { getAllUser, Login, SignUp } from "../controller/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/sign-up", SignUp);
userRouter.post('/login',Login)

export default userRouter;
