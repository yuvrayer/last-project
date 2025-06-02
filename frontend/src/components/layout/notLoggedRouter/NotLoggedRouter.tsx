import { Route, Routes } from "react-router-dom";
import Login from "../../auth/login/Login";
import Signup from "../../auth/signup/Signup";


export default function NotLoggedRouter(): JSX.Element {
    return (
        <Routes>
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
}
