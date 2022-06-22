import { Router, Request, Response } from "express";
import { loginUserHandler, registerUserHandler } from "../controllers/user.controller";
import { loginUserSchema, registerUserSchema } from "../dataSchema/user.schema";
import validateRequestBody from "../middlewares/validateRequestBody";

const userRoute = Router()

userRoute.get("/healthcheck", (req:Request, res:Response) => res.status(200).send("user route is running"))

userRoute.post("/register", validateRequestBody(registerUserSchema), registerUserHandler)
userRoute.post("/login", validateRequestBody(loginUserSchema), loginUserHandler)


export default userRoute