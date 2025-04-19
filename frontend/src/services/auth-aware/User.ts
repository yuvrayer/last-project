import Likes from "../../models/likes/Likes";
import Vacation from "../../models/vacation/Vacation";
import AuthAware from "./AuthAware";

export default class User extends AuthAware {
    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`)
        return response.data
    }

    async getAllLikes(): Promise<Likes[]> {
        const response = await this.axiosInstance.get<Likes[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follow/alllikes`)
        return response.data
    }

    async addLike(vacationId: string, userId: string): Promise<boolean> {
        const response = await this.axiosInstance.post<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/follow/like/${vacationId}`, { userId })
        return response.data
    }

    async unlike(vacationId: string, userId: string): Promise<boolean> {
        const response = await this.axiosInstance.post<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/follow/unlike/${vacationId}`, { userId })
        return response.data
    }
}
