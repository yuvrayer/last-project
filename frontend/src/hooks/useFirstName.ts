import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import User from "../models/user/User"
import { AuthContext } from "../components/auth/auth/Auth"

export default function useFirstName() {
    const { jwt } = useContext(AuthContext)!
    // const { name } = jwtDecode<User>(jwt)

    const firstName = useMemo(() => {
        const { firstName } = jwtDecode<User>(jwt)
        return firstName
    }, [jwt])

    return firstName
}