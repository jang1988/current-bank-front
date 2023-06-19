import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, loadedStatus, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import './Login.css';

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const statusAuth = useSelector((state) => state.auth.status);
    console.log('statusAuth: ', statusAuth);


    if (statusAuth === 'error') alert('Пользователь не найден');
    dispatch(loadedStatus());

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (value) => {
        dispatch(fetchUserData(value));
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    autoComplete="on"
                    {...register('email', { required: 'Укажите почту' })}
                />
                {errors.email && <span className="error">{errors.email?.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    autoComplete="on"
                    {...register('password', { required: 'Укажите пароль' })}
                />
                {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit">Login</button>
        </form>
    );
};
