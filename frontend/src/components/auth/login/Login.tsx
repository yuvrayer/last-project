/* 
import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/user/Login'
import auth from '../../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<LoginModel>()

    const { newLogin } = useContext(AuthContext)!

    const navigate = useNavigate()

    async function submit(login: LoginModel) {

        try {
            const jwt = await auth.login(login)
            // here i need to code something that will set the JWT in the AuthContext state
            newLogin(jwt.jwt)
            navigate(`/vacations`)
        } catch (e) {
            alert(e)
        }
    }

    return (<div className='LoginConatiner'>
        <div className='Login'>
            <h1>Login</h1> <br />
            <form onSubmit={handleSubmit(submit)}>
                <label>email</label>
                <input {...register('email', {
                    required: {
                        value: true,
                        message: 'you must provide an email'
                    }
                })} /><br />

                <span className='error'>{formState.errors.email?.message}</span>

                <label>password</label>
                <input type="password" {...register('password', {
                    required: {
                        value: true,
                        message: 'you must provide a password'
                    }
                })} /><br />
                <span className='error'>{formState.errors.password?.message}</span>
                <button>Login</button> <br />
                <span>don`t have account? <br />
                    <NavLink to="/auth/signup">register now</NavLink>
                </span>
            </form>
        </div>
    </div>
    )
}
    */


import "./Login.css"
import logoSource from '../../../assets/images/vacationsLogo.png'
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginModel from '../../../models/user/Login';
import auth from '../../../services/auth';

const LoginContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2', // Blue background for the page
}));

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

export default function Login(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<LoginModel>();
    const { newLogin } = useContext(AuthContext)!;
    const navigate = useNavigate();

    async function submit(login: LoginModel) {
        try {
            const jwt = await auth.login(login);
            // Set JWT in the AuthContext state
            newLogin(jwt.jwt);
            navigate(`/vacations`);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <LoginContainer direction="column" justifyContent="center" alignItems="center">
            <div className="img">
                <img src={logoSource} alt="Logo" />
                <span> vacations website by: Yuval Rayer </span>
            </div>
            <Card>
                <Typography variant="h4" component="h1" align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Login
                </Typography>

                <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                    {/* Email Input */}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'You must provide an email',
                            },
                        })}
                        error={!!formState.errors.email}
                        helperText={formState.errors.email?.message}
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

                    {/* Password Input */}
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 4, message: 'Password must be at least 4 characters' }
                        })}
                        error={!!formState.errors.password}
                        helperText={formState.errors.password?.message}
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1e88e5' },
                            padding: 1.5,
                            fontSize: 16,
                        }}
                    >
                        Login
                    </Button>

                    {/* Register Link */}
                    <Typography sx={{ textAlign: 'center', marginTop: 1, color: '#1976d2' }}>
                        Don't have an account?{' '}
                        <NavLink to="/auth/signup" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                            Register now
                        </NavLink>
                    </Typography>

                </Box>
            </Card>
        </LoginContainer>
    );
}
