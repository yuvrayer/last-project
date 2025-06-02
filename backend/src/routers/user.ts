import { Router } from "express";
import { getVacations } from "../controllers/user/controller";
import { enforceAuth } from "../middlewares/enforce-auth"

const userRouter = Router()

userRouter.use(enforceAuth)
userRouter.get('/', getVacations)

export default userRouter