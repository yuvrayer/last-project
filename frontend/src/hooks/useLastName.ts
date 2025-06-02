import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import User from "../models/user/User"
import { AuthContext } from "../components/auth/auth/Auth"

export default function useLastName() {
    const { jwt } = useContext(AuthContext)!
    // const { name } = jwtDecode<User>(jwt)

    const lastName = useMemo(() => {
        const { lastName } = jwtDecode<User>(jwt)
        return lastName
    }, [jwt])

    return lastName
}