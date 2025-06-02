/* import { useForm } from 'react-hook-form'
import './Signup.css'
import auth from '../../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import { NavLink, useNavigate } from 'react-router-dom'
import User from '../../../models/user/User'

export default function Signup(): JSX.Element {

    const { register, handleSubmit } = useForm<User>()

    const { newLogin } = useContext(AuthContext)!

    const navigate = useNavigate()

    async function submit(user: User) {
        const jwt = await auth.signup(user)
        // here i need to code something that will set the JWT in the AuthContext state
        newLogin(jwt)
        navigate(`/vacations`)
    }

    return (
        <div className='SignupContainer'>
            <div className='Signup'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(submit)}>
                    <label>first name</label>
                    <input {...register(`firstName`, {
                        required: {
                            value: true,
                            message: 'you must provide a first name'
                        }
                    })}></input><br />

                    <label>last name</label>
                    <input {...register(`lastName`, {
                        required: {
                            value: true,
                            message: 'you must provide a last name'
                        }
                    })}></input><br />

                    <label>email</label>
                    <input {...register('email', {
                        required: {
                            value: true,
                            message: 'you must provide an email'
                        }
                    })} /><br />

                    <label>password</label>
                    <input type="password" {...register('password', {
                        required: {
                            value: true,
                            message: 'you must provide a password'
                        },
                        minLength: {
                            value: 4,
                            message: 'password must be at least 4 chars'
                        }
                    })} /><br />

                    <button>Register</button> <br />
                    <span>already a member? <br />
                        <NavLink to="/">login</NavLink>
                    </span>
                </form>
            </div>
        </div>
    )
}
*/

import "./Signup.css"
import logoSource from '../../../assets/images/vacationsLogo.png'
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, TextField, Typography, FormControl, FormLabel, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../../services/auth';
import { AuthContext } from '../auth/Auth';
import User from '../../../models/user/User';

const Card = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    backgroundColor: '#ffffff', // White background for the form card
    borderRadius: '8px', // Rounded corners
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '400px',
    },
}));

const SignupContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2', // Blue background for the page
}));

export default function Signup(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const { newLogin } = React.useContext(AuthContext)!;
    const navigate = useNavigate();

    async function submit(user: User) {
        const jwt = await auth.signup(user);
        newLogin(jwt);
        navigate(`/vacations`);
    }

    return (
        <SignupContainer direction="column" justifyContent="center" alignItems="center">
            <div className="img">
                <img src={logoSource} alt="Logo" />
                <span> vacations website by: Yuval Rayer </span>
            </div>
            <Card>
                <Typography variant="h4" component="h1" align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Sign Up
                </Typography>

                <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                    {/* First Name Input */}
                    <FormControl fullWidth>
                        <FormLabel htmlFor="firstName" sx={{ color: '#1976d2' }}>First Name</FormLabel>
                        <TextField
                            id="firstName"
                            label="First Name"
                            {...register('firstName', { required: 'First name is required' })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1e88e5',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    {/* Last Name Input */}
                    <FormControl fullWidth>
                        <FormLabel htmlFor="lastName" sx={{ color: '#1976d2' }}>Last Name</FormLabel>
                        <TextField
                            id="lastName"
                            label="Last Name"
                            {...register('lastName', { required: 'Last name is required' })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1e88e5',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    {/* Email Input */}
                    <FormControl fullWidth>
                        <FormLabel htmlFor="email" sx={{ color: '#1976d2' }}>Email</FormLabel>
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1e88e5',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    {/* Password Input */}
                    <FormControl fullWidth>
                        <FormLabel htmlFor="password" sx={{ color: '#1976d2' }}>Password</FormLabel>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 4, message: 'Password must be at least 4 characters' }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1e88e5',
                                    },
                                },
                            }}
                        />
                    </FormControl>

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1e88e5' } }}>
                        Register
                    </Button>

                    {/* Link to login */}
                    <Typography sx={{ textAlign: 'center', marginTop: 1, color: '#1976d2' }}>
                        Already a member?{' '}
                        <NavLink to="/" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                            Login
                        </NavLink>
                    </Typography>
                </Box>
            </Card>
        </SignupContainer>
    );
}
