import { useForm } from 'react-hook-form'
import './New.css'
import loadingImageSource from '../../../assets/images/loading.webp'
import { useAppDispatch } from '../../../redux/hooks'
import useService from '../../../hooks/useService'
import { ChangeEvent, useState } from 'react'
import VacationDraft from '../../../models/vacation/VacationDraft'
import Admin from '../../../services/auth-aware/Admin'
import { newVacation } from '../../../redux/vacationsSlice'
import { useNavigate } from 'react-router-dom'

export default function New(): JSX.Element {

    const { register, handleSubmit, reset, formState, setValue } = useForm<VacationDraft>()

    const [previewImageSrc, setPreviewImageSrc] = useState<string>('')

    const dispatch = useAppDispatch()

    const adminService = useService(Admin)


    async function submit(draft: VacationDraft) {
        const startDate = new Date(draft.startDate)
        const finishDate = new Date(draft.finishDate)


        if (startDate < new Date()) {
            alert("the starting date must not be in the past")
        }
        else if (finishDate < startDate) {
            alert("the finish date must be later than the starting date")
        }
        else try {
            // draft.file = (draft.file as unknown as FileList)[0]

            const newVacationFromServer = await adminService.createVacation(draft)
            reset()
            setPreviewImageSrc('')
            dispatch(newVacation(newVacationFromServer))
            navigate(`/vacations`)
        } catch (e) {
            alert(e)
        }
    }

    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if (file) {
            const imageSource = URL.createObjectURL(file)
            setPreviewImageSrc(imageSource)
            setValue('file', file);  // Set the selected file in the form state
        }
    }

    const navigate = useNavigate()
    function cancel() {
        navigate(`/vacations`)
    }

    return (
        <div className='NewVacationContainer'>
            <div className='NewVacation'>
                <h1> Add a new vacation: </h1>

                <form onSubmit={handleSubmit(submit)}>

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
                    })} />
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
                        },
                    })} />
                    <span className='error'>{formState.errors.price?.message}</span>

                    <label>cover Image:</label>
                    <label className="cover-image-label">
                        {previewImageSrc ? (
                            <div className="cover-image-preview">
                                <img src={previewImageSrc} alt="Vacation" />
                                <div className="change-image-text">Change Image</div>
                            </div>
                        ) : (
                            <div className="cover-image-placeholder">
                                <div className="change-image-text">Change Image</div>
                            </div>
                        )}
                        <input
                            {...register('file')}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={previewImage}
                            className="file-input"
                        />
                    </label>
                    <span className='error'>{formState.errors.file?.message}</span>
                    <br />
                    {!formState.isSubmitting && <button>Add Vacation</button>}
                    {formState.isSubmitting && <p>posting new vacation... <img src={loadingImageSource} /></p>}
                    <br />
                    <button onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}