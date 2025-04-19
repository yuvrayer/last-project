import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()
    function navigateToHome() {
        navigate(`/vacations`)
    }

    return (
        <div className='NotFound'>
            404 not found
            <br />
            there isn`t such a Url

            <br />
            <button onClick={navigateToHome}>Navigate Back To Vacations Screen</button>
        </div>
    )
}