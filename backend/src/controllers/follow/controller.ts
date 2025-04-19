import { NextFunction, Request, Response } from "express";
import Follow from "../../models/follow";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/app-error";

export async function getAllLikes(req: Request, res: Response, next: NextFunction) {
    try {
        const likes = await Follow.findAll();
        res.json(likes)
    } catch (e) {
        next(e)
    }
}

export async function addVacationLike(req: Request<{ vacationId: string }, {}, { userId: string }>, res: Response, next: NextFunction) {
    try {
        const vacationId = req.params.vacationId
        const userId = req.body.userId
        const likes = await Follow.create({ userId, vacationId });
        res.json(likes)
    }
    catch (e) {
        next(e)
    }
}

export async function removeVacationLike(req: Request<{ vacationId: string }, {}, { userId: string }>, res: Response, next: NextFunction) {
    try {
        const vacationId = req.params.vacationId
        const userId = req.userId
        const unlike = await Follow.destroy({
            where:
            {
                userId,
                vacationId
            }
        });

        if (!unlike) return next(new AppError(
            StatusCodes.NOT_FOUND,
            'Tried to delete unexciting record'
        ))
        res.json(unlike)
    }
    catch (e) {
        next(e)
    }
}