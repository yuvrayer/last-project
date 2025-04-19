import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
})

export const signupValidator = loginValidator.append({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().optional()
})

export const loginValidatorAdmin = loginValidator.append({
    role: "admin"
})
