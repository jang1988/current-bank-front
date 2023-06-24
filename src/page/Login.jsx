import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import './Login.css';

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (value) => {
        const data = await dispatch(fetchUserData(value));

    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
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
            <button className={isValid ? 'loginButton' : ''} disabled={!isValid} type="submit">Login</button>
        </form>
    );
};
