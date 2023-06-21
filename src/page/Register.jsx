import React from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import './Register.css';

const Register = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (value) => {
        const data = await dispatch(fetchRegister(value));
        
        if (!data.payload) {
            return alert('Не удалось зарегистрироваться')
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Registration</h2>
            <div className="form-group">
                <label htmlFor="fullName">FullName</label>
                <input
                    placeholder="vasya"
                    type="text"
                    id="fullName"
                    autoComplete="on"
                    {...register('fullName', { required: 'Укажите имя' })}
                />
                {errors.fullName && <span className="error">{errors.fullName?.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    placeholder="baklay@test.com"
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
                    placeholder="12345"
                    type="password"
                    id="password"
                    autoComplete="on"
                    {...register('password', { required: 'Укажите пароль' })}
                />
                {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button className={isValid ? 'registerButton' : ''} disabled={!isValid} type="submit">Register</button>
        </form>
    );
};

export default Register;
