import Joi from "joi";

export const newVacationValidator = Joi.object({
    destination: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    price: Joi.number().min(0).max(10000).required(),
})

export const newVacationFilesValidator = Joi.object({
    file: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).required()
})

export const updateVacationFilesValidator = Joi.object({
    file: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).optional()
})


export const updateVacationValidator = newVacationValidator

export const newVacationParams = Joi.object({
    id: Joi.string().uuid().required()
})

export const updateVacationParams = Joi.object({
    vacationId: Joi.string().uuid().required()
})