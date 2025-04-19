import { Request, Response, NextFunction } from "express"
import Joi from "joi"
import paramsValidation from "./params-validation"
import AppError from "../errors/app-error"
import { StatusCodes } from "http-status-codes"

describe("paramsValidation middleware", () => {
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    })

    let req: Partial<Request>
    let res: Partial<Response>
    let next: NextFunction

    beforeEach(() => {
        req = {
            params: {},
        }

        res = {}

        next = jest.fn()
    })

    it("should call next with no arguments if validation passes", async () => {
        const validId = "123e4567-e89b-12d3-a456-426614174000"
        req.params = { id: validId }

        const middleware = paramsValidation(schema)

        await middleware(req as Request, res as Response, next)

        expect(req.params).toEqual({ id: validId })
        expect(next).toHaveBeenCalledWith() // no error passed
    })

    it("should call next with AppError if validation fails", async () => {
        req.params = { id: "not-a-uuid" }

        const middleware = paramsValidation(schema)

        await middleware(req as Request, res as Response, next)

        expect(next).toHaveBeenCalledWith(expect.any(AppError))
        const error = (next as jest.Mock).mock.calls[0][0]
        expect(error.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
    })
})
