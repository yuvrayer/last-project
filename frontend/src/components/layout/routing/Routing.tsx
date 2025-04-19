import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Vacations from "../../vacationLayout/vacations/Vacations";
import Edit from "../../vacationLayout/edit/Edit";
import New from "../../vacationLayout/new/New";
import Statistics from "../../vacationLayout/statistics/Statistics";
import useRole from "../../../hooks/useRole";


export default function Routing(): JSX.Element {
    const userRole = useRole()
    let allow = null
    if (userRole === "admin") {
        allow = true
    }
    return (
        <Routes>
            {allow && <>
                <Route path="/admin/edit/:id" element={<Edit />} />
                <Route path="/admin/new" element={<New />} />
                <Route path="/admin/statistics" element={<Statistics />} />
            </>
            }

            <Route path="/vacations" element={<Vacations />} />
            <Route path="/" element={<Navigate to="/vacations" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
