import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import useFirstName from '../../../hooks/useFirstName'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'
import useRole from '../../../hooks/useRole'
import useLastName from '../../../hooks/useLastName'
import logoSource from '../../../assets/images/vacationsLogo.png'

export default function Header() {

    const firstName = useFirstName()
    const lastName = useLastName()
    const role = useRole()
    let admin = false

    if (role === "admin") {
        admin = true
    }

    const { logout } = useContext(AuthContext)!
    const navigate = useNavigate()

    function logMeOut() {
        logout()
        navigate(`/`)
    }

    // // Use useEffect to add the beforeunload event listener
    // useEffect(() => {
    //     // This will run when the user is about to leave the page or close the window/tab
    //     const handleBeforeUnload = () => {
    //         logout()
    //     }

    //     // Add the event listener for beforeunload
    //     window.addEventListener('beforeunload', handleBeforeUnload)

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, [logout])

    return (
        <div className='Header'>
            <div>
                <img src={logoSource} alt="Logo" />
            </div>
            <div>
                <nav>
                    {!admin && <>
                        <NavLink to="/vacations">vacation</NavLink>
                    </>}

                    {admin && <>
                        <NavLink to="/vacations">vacation</NavLink>
                        <NavLink to="/admin/new">new vacation</NavLink>
                        <NavLink to="/admin/statistics">statistics</NavLink>
                    </>}
                </nav>
            </div>
            <div>
                Hello {firstName} {lastName} | <button onClick={logMeOut}>logout</button>
            </div>
        </div>
    )
}
