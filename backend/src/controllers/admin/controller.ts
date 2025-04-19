import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import Vacation from "../../models/vacation";
import Follow from "../../models/follow";

export async function getSingleVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const singleVacation = await Vacation.findByPk(req.params.id)
        res.json(singleVacation)
    } catch (e) {
        next(e)
    }
}

export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

        const id = req.params.id
        const deletedRows = await Vacation.destroy({
            where: { id }
        })

        if (deletedRows === 0) return next(new AppError(StatusCodes.NOT_FOUND, 'the post you were trying to delete does not exist'))

        res.json({
            success: true
        })

    } catch (e) {
        next(e)
    }
}

export async function createVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId

        let createParams = { ...req.body, userId, fileURL: req.fileURL }

        const vacation = await Vacation.create(createParams)
        await vacation.reload()
        res.json(vacation)
    } catch (e) {
        next(e)
    }
}

export async function updateVacation(req: Request<{ vacationId: string }
    , {}, { finishDate: Date, startDate: Date, description: string, id: string, price: number, destination: string }>
    , res: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(req.params.vacationId)

        const { finishDate, startDate, description, id, price, destination } = req.body
        vacation.price = price
        vacation.id = id
        vacation.description = description
        vacation.destination = destination
        vacation.startDate = startDate
        vacation.finishDate = finishDate

        if (req.fileURL) {
            vacation.fileURL = req.fileURL
        }

        await vacation.save() // <= this command generates the actual SQL UPDATE
        res.json(vacation)

    } catch (e) {
        next(e)
    }
}
