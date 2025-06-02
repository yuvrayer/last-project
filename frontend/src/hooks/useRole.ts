import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import User from "../models/user/User"
import { AuthContext } from "../components/auth/auth/Auth"

export default function useUserId() {
    const { jwt } = useContext(AuthContext)!
    // const { name } = jwtDecode<User>(jwt)

    const role = useMemo(() => {
        const { role } = jwtDecode<User>(jwt)
        return role
    }, [jwt])

    return role
}