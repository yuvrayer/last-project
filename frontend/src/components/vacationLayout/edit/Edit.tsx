import { useNavigate, useParams } from 'react-router-dom'
import './Edit.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import useService from '../../../hooks/useService'
import AdminService from '../../../services/auth-aware/Admin'
import { updateVacation } from '../../../redux/vacationsSlice'
import VacationDraft from '../../../models/vacation/VacationDraft'

export default function Edit(): JSX.Element {

    const { id } = useParams<'id'>()
    const { handleSubmit, register, formState, reset, setValue } = useForm<VacationDraft>()
    const navigate = useNavigate()

    const vacation = useAppSelector(state => state.vacations.vacations.find(v => v.id === id))
    const dispatch = useAppDispatch()

    const adminService = useService(AdminService)

    useEffect(() => {
        if (id && vacation) {
            // profileService.getPost(id)
            //     .then(reset)
            //     .catch(alert)
            const { price, description, destination, fileURL, finishDate, startDate } = vacation

            reset({ price, description, destination, finishDate, startDate })
            setPreviewImageSrc(fileURL)
        }
    }, [id, vacation, reset])


    async function submit(draft: VacationDraft) {

        const startDate = new Date(draft.startDate)
        const finishDate = new Date(draft.finishDate)

        if (finishDate < startDate) {
            alert("the finish date must be later than the starting date")
        }

        else try {

            if (id) {
                const updatedVacation = await adminService.updateVacation(id, draft)
                dispatch(updateVacation(updatedVacation))
                setPreviewImageSrc('')
                navigate('/vacations')
            }
        } catch (e) {
            alert(e)
        }
    }

    function cancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();  // Prevent form submission
        navigate(`/vacations`);
    }

    const [previewImageSrc, setPreviewImageSrc] = useState<string>('')

    const [changed, setChanged] = useState<boolean>(false)
    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if (file) {
            const imageSource = URL.createObjectURL(file)
            setPreviewImageSrc(imageSource)
            setValue('file', file);  // Set the selected file in the form state
            setChanged(true)
        }
    }

    return (
        <div className='EditVacationContainer'>
            <div className='EditVacation'>
                <form onSubmit={handleSubmit(submit)}>
                    <h1>Edit Vacation</h1>
                    <label>destination</label>
                    <input {...register('destination', {
                        required: {
                            value: true,
                            message: 'you must provide a destination'
                        }
                    })} />
                    <span className='error'>{formState.errors.destination?.message}</span>

                    <label>description</label>
                    <textarea className='description' {...register('description', {
                        required: {
                            value: true,
                            message: 'you must provide a description'
                        }
                    })}></textarea>
                    <span className='error'>{formState.errors.description?.message}</span>

                    <label>start on</label>
                    <input type='date' {...register('startDate', {
                        required: {
                            value: true,
                            message: 'you must provide a start date'
                        }
                    })} />
                    <span className='error'>{formState.errors.startDate?.message}</span>

                    <label>end on</label>
                    <input type='date' {...register('finishDate', {
                        required: {
                            value: true,
                            message: 'you must provide an end date'
                        }
                    })} />
                    <span className='error'>{formState.errors.finishDate?.message}</span>

                    <label>price</label>
                    <input type='number' {...register('price', {
                        required: {
                            value: true,
                            message: 'you must provide a price'
                        },
                        min: {
                            value: 0,
                            message: 'you must provide a positive price'
                        },
                        max: {
                            value: 10000,
                            message: 'the ceiling for price is 10,000$'
                        },
                        pattern: {
                            value: /^[0-9]+$/, // Regex for whole numbers only (no decimal)
                            message: 'Please enter a valid number (no decimal / letters)', // Error message if input is invalid
                        }
                    })} />
                    <span className='error'>{formState.errors.price?.message}</span>

                    <label>cover Image:</label>
                    <label className="cover-image-label">
                        {previewImageSrc ? (
                            <div className="cover-image-preview">
                                {changed &&
                                    <img src={previewImageSrc} alt="Vacation" />
                                }
                                {!changed &&
                                    <img src={`${import.meta.env.VITE_AWS_SERVER_URL}/${previewImageSrc}`} alt="Vacation" />
                                }
                                <div className="change-image-text">Change Image</div>
                            </div>
                        ) : (
                            <div className="cover-image-placeholder">
                                <div className="change-image-text">Change Image</div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            {...register('file')}
                            onChange={previewImage}
                            className="file-input"
                        />
                    </label>
                    <span className='error'>{formState.errors.file?.message}</span>


                    <button>Update Vacation</button> <br />
                    <button onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}