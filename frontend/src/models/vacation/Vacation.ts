import BaseVacation from "./BaseVacation";

export default interface Vacation extends BaseVacation{
    id: string,
    createdAt: Date,
    updatedAt: Date
    fileURL: string
}