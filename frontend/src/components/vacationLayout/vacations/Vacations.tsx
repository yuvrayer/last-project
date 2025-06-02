import { useEffect, useState } from 'react'
import './Vacations.css'
import Loading from '../../common/loading/Loading'
import useTitle from '../../../hooks/useTitle'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init as initVacations } from '../../../redux/vacationsSlice'
import { init as initLikes } from '../../../redux/followingSlice'
import useService from '../../../hooks/useService'
import User from '../../../services/auth-aware/User'
import Vacation from '../vacation/Vacation'
import VacationForm from '../vacationForm/vacationForm'
import useUserId from '../../../hooks/useUserId'
import VacationModel from '../../../models/vacation/Vacation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import useRole from '../../../hooks/useRole'

export default function Vacations(): JSX.Element {

    //some declarations:
    useTitle('Vacations')
    const dispatch = useAppDispatch()
    const userService = useService(User)
    const userId = useUserId()

    //pages logic:
    const [page, setPage] = useState<number>(1)
    const itemsPerPage = 10  // Define the number of vacations to show per page

    function pagesChange(event: React.MouseEvent<HTMLButtonElement>) {
        setPage(+event.currentTarget.value)
    }

    const [vacations, setVacations] = useState<VacationModel[]>([])

    const vacationsRedux = useAppSelector(state => state.vacations.vacations)

    //init the data (vacations, likes) with the server, in case the redux is empty
    //if not, give the vacation the state from the redux (to be able to filter without change the redux state)
    useEffect(() => {
        (async () => {
            window.scrollTo(0, 0);
            try {
                if (vacationsRedux.length === 0) {
                    const vacationsFromServerBeforeSort = await userService.getAllVacations()
                    const vacationsFromServer = vacationsFromServerBeforeSort.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                    dispatch(initVacations(vacationsFromServer))
                    setVacations(vacationsFromServer)
                    const likesFromServer = await userService.getAllLikes()
                    dispatch(initLikes(likesFromServer))
                }
                else {
                    setVacations(vacationsRedux)
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [dispatch])


    //filter logic
    const [filter, setFilter] = useState<string>('all'); // state for the selected filter

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setPage(1); // Reset to page 1 when filter changes
    };

    const likesReduxState = useSelector((state: RootState) => state.following.likes);


    //if the filter state change, it will change the vacation state
    // like switch cases

    useEffect(() => {
        if (filter === "followed") {
            const followArray = likesReduxState.filter(l => userId === l.userId).map(l => l.vacationId)
            const filteredVacations = vacationsRedux.filter(v => followArray.includes(v.id))
            if (filteredVacations) {
                setVacations(filteredVacations); // Update the state with filtered vacations
            } else {
                alert(`there are not vacations that you follow right now`)
            }
        } else if (filter === "notStarted") {
            const filteredVacations = vacationsRedux.filter(v => new Date(v.startDate) > new Date())
            if (filteredVacations?.length !== 0) {
                setVacations(filteredVacations); // Update the state with filtered vacations
            } else {
                alert(`there are not vacations that not started right now`)
            }
        } else if (filter === "active") {
            const filteredVacations = vacationsRedux.filter(v => new Date(v.finishDate) > new Date() && new Date(v.startDate) < new Date())
            if (filteredVacations?.length !== 0) {
                setVacations(filteredVacations); // Update the state with filtered vacations
            } else {
                alert(`there are not vacations that active right now`)
            }
        }
        else {
            setVacations(vacationsRedux)
        }
    }, [filter, likesReduxState, userId, vacationsRedux])


    const role = useRole()
    let isAllowActions = null;;
    if (role === "admin") {
        isAllowActions = true
    } else {
        isAllowActions = false
    }

    return (
        <>
            {!isAllowActions && <VacationForm onFilterChange={handleFilterChange} />} {/* Pass filter handler */}

            <div className='VacationsContainer'>
                {vacations?.length === 0 && <Loading />}
                {vacations &&
                    vacations.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map(v =>
                            <Vacation
                                key={v.id}
                                vacation={v}
                            />
                        )
                }
            </div>

            <span className='span'>pages:</span>
            <div className='paginationBar'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {/* Dynamically generate pagination buttons */}
                        {vacations && Array.from({ length: Math.ceil(vacations?.length / itemsPerPage) }).map((_, index) => (
                            <li className="page-item" key={index}>
                                <button
                                    value={index + 1}
                                    className={`page-link ${page === index + 1 ? 'active' : ''}`}
                                    onClick={pagesChange}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

        </>
    )
}