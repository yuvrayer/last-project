import { Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Vacation from "./vacation";
import User from "./user";

@Table({
    underscored: true,
})

export default class Follow extends Model {

    @PrimaryKey
    @ForeignKey(() => Vacation)
    @Column(DataType.UUID)
    vacationId: string

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string
}