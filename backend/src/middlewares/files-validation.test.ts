import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import filesValidation from "./files-validation";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

describe("filesValidation middleware", () => {
    const schema = Joi.object({
        avatar: Joi.object().required(), // assuming a file named 'avatar' is required
    });

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {};
        next = jest.fn();
    });

    it("should call next with no arguments if validation passes", async () => {
        req.files = {
            avatar: {
                name: "profile.jpg",
                data: Buffer.from("image data"),
                encoding: "7bit",
                tempFilePath: "",
                truncated: false,
                mimetype: "image/jpeg",
                md5: "abc123",
                size: 12345,
                mv: jest.fn(), 
            },
        };



        const middleware = filesValidation(schema);

        await middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(); // no error
        expect(req.files).toHaveProperty("avatar");
    });

    it("should call next with AppError if validation fails", async () => {
        req.files = {}; // Missing 'avatar'

        const middleware = filesValidation(schema);

        await middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
        const error = (next as jest.Mock).mock.calls[0][0];
        expect(error.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    });
});
