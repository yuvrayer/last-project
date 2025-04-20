import { Router } from "express";
import validation from "../middlewares/validation";
import { createVacation, deleteVacation, getSingleVacation, updateVacation } from "../controllers/admin/controller";
import { newVacationFilesValidator, newVacationParams, newVacationValidator, updateVacationFilesValidator, updateVacationParams, updateVacationValidator } from "../controllers/admin/validator";
import paramsValidation from "../middlewares/params-validation";
import { enforceAdminAuth } from "../middlewares/enforce-auth"
import fileUploader from "../middlewares/file-uploader";
import filesValidation from "../middlewares/files-validation";

const adminRouter = Router()

adminRouter.use(enforceAdminAuth)

adminRouter.get('/edit/:vacationId', paramsValidation(updateVacationParams), getSingleVacation)
adminRouter.patch('/edit/:vacationId', paramsValidation(updateVacationParams), filesValidation(updateVacationFilesValidator), fileUploader, validation(updateVacationValidator), updateVacation)
adminRouter.post('/new', validation(newVacationValidator), filesValidation(newVacationFilesValidator), fileUploader, createVacation)
adminRouter.delete('/:id', paramsValidation(newVacationParams), deleteVacation)

export default adminRouter