import { useEffect, useState } from "react"
import useService from "../../../hooks/useService"
import VacationModel from "../../../models/vacation/Vacation"
import User from "../../../services/auth-aware/User"
import { useAppDispatch } from "../../../redux/hooks"
import { like, unlike } from "../../../redux/followingSlice"
import Likes from "../../../models/likes/Likes"
import { useNavigate } from "react-router-dom"
import "./Vacation.css"
import Admin from "../../../services/auth-aware/Admin"
import { removeVacation } from "../../../redux/vacationsSlice"
import useUserId from "../../../hooks/useUserId"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import useRole from "../../../hooks/useRole"

interface VacationProps {
    vacation: VacationModel,
}

export default function Vacation(props: VacationProps): JSX.Element {

    const { price, description, destination, startDate, finishDate, fileURL, id } = props.vacation

    const role = useRole()
    let isAllowActions = null
    if (role === "admin") {
        isAllowActions = true
    } else {
        isAllowActions = false
    }

    const userService = useService(User)
    const adminService = useService(Admin)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [likesFromServerState, setLikes] = useState<Likes[] | null>(null);

    const likesReduxState = useSelector((state: RootState) => state.following.likes);

    useEffect(() => {
        try {
            setLikes(likesReduxState)
        } catch (e) {
            alert(e)
        }
    }, [likesReduxState])

    function edit() {
        navigate(`/admin/edit/${id}`)
    }


    const userId = useUserId()


    async function removeVacationButton(event: React.MouseEvent<HTMLButtonElement>) {
        const confirmed = confirm(`Are you sure you want to delete ${event.currentTarget.value}?`);
        if (!confirmed) return;
        try {
            await adminService.removeVacation(id)
            dispatch(removeVacation({ id }))
        } catch (e) {
            alert(e)
        }
    }

    async function changeLike(event: React.MouseEvent<HTMLButtonElement>) {
        try {
            const vacationId = event.currentTarget.value
            const likesArray = await userService.getAllLikes()
            const like = likesArray.find(like => like.userId === userId && like.vacationId === vacationId)
            if (like) {
                await removeLike(vacationId)
            }
            else {
                await giveLike(vacationId)
            }
        } catch (e) {
            alert(e)
        }
    }

    async function removeLike(vacationId: string) {
        try {
            await userService.unlike(vacationId, userId)
            dispatch(unlike({ vacationId: vacationId, userId: userId }))
        } catch (e) {
            alert(e)
        }
    }

    async function giveLike(vacationId: string) {
        try {
            await userService.addLike(vacationId, userId)
            dispatch(like({ vacationId, userId }))
        } catch (e) {
            alert(e)
        }

    }

    const userHasLiked = likesFromServerState?.some(like => like.userId === userId && like.vacationId === id)


    return (
        <div className="Vacation">

            {isAllowActions &&
                <>
                    <button value={id} className="edit" onClick={edit}> <i className="bi bi-pencil"></i> Edit</button>
                    <button value={id} className="delete" onClick={removeVacationButton}> <i className="bi bi-trash3"></i> Delete</button>
                </>
            }

            {!isAllowActions &&
                <>
                    <button value={id}
                        className={`${userHasLiked ? 'liked' : 'likes'}`}
                        onClick={changeLike}> <i className="bi bi-heart-fill"></i> Likes: {likesFromServerState?.filter(l => l.vacationId === id).length}</button>
                </>
            }

            <img src={`${import.meta.env.VITE_AWS_SERVER_URL}/${fileURL}`}></img>
            <span>{destination}</span>
            <p className="date"><i className="bi bi-calendar-event"></i> {new Date(startDate).toLocaleDateString()} - {new Date(finishDate).toLocaleDateString()}</p>
            <p className="description">{description}</p>
            <button className="price">${price}</button>
        </div>
    )
}