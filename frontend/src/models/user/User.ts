import UserDraft from "./Login"

export default interface User extends UserDraft {
    id: string,
    role: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date
}