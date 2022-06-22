import { Router, Request, Response } from "express";
import userRoute from "./user.routes";

const apiRoutes = Router()

apiRoutes.use("/user",userRoute)

export default apiRoutes