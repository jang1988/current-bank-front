import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg'
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <nav className="nav-container">
                <ul className="nav-list">
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;
