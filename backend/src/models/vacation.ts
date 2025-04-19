import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Follow from "./follow";
import User from "./user";

@Table({
    underscored: true,
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string

    @AllowNull(false)
    @Column(DataType.STRING)
    description: string

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    startDate: Date

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    finishDate: Date

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    price: number

    @AllowNull(true)
    @Column(DataType.STRING)
    fileURL: string

    @BelongsToMany(() => User, () => Follow)
    user: User[]
}
