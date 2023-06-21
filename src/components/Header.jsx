import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/slices/auth';
import logo from '../assets/images/logo.jpg';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const onClickLogout = () => {
        if (window.confirm('Точно?')) {
            dispatch(logout());
        }
    };
    
    const loginButtons = (
        <>
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Registration
                </Link>
            </li>
        </>
    );

    const addBanksButtons = (
        <>
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/add-bank" className="nav-link">
                    Добавить банку
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/info" className="nav-link">
                    Info
                </Link>
            </li>
            <li className="nav-item">
                <button onClick={onClickLogout} className="nav-link">
                    Выход
                </button>
            </li>
        </>
    );

    return (
        <header className="header-container">
            <div className="logo">
                {isAuth && <img src={logo} alt="Logo" className="logo-image" />}
            </div>
            <nav className="nav-container">
                <ul className="nav-list">{isAuth ? addBanksButtons : loginButtons}</ul>
            </nav>
        </header>
    );
};

export default Header;
