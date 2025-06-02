import Vacation from "../../models/vacation/Vacation";
import VacationDraft from "../../models/vacation/VacationDraft";
import AuthAware from "./AuthAware";

export default class Admin extends AuthAware {

    async getVacation(vacationId: string): Promise<Vacation> {
        const response = await this.axiosInstance.get<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/admin/edit/${vacationId}`)
        return response.data
    }

    async removeVacation(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/admin/${id}`)
        return response.data
    }

    async createVacation(draft: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/admin/new`, draft, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        return response.data
    }

    async updateVacation(id: string, draft: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.patch<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/admin/edit/${id}`, draft, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
        return response.data
    }
}