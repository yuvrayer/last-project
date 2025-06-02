import { Router } from "express";
import validation from "../middlewares/validation";
import { addVacationLike, getAllLikes, removeVacationLike } from "../controllers/follow/controller";
import { followValidatorParams, followValidatorReq, unfollowValidatorParams, unfollowValidatorReq } from "../controllers/follow/validator";
import paramsValidation from "../middlewares/params-validation";
import { enforceAuth } from "../middlewares/enforce-auth"

const followRouter = Router()

followRouter.use(enforceAuth)
followRouter.get('/alllikes', getAllLikes)
followRouter.post('/like/:vacationId', validation(followValidatorReq), paramsValidation(followValidatorParams), addVacationLike)
followRouter.post('/unlike/:vacationId', validation(unfollowValidatorReq), paramsValidation(unfollowValidatorParams), removeVacationLike)


export default followRouter