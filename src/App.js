import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';
import Header from './components/Header';
import Main from './page/Main';
import { Login } from './page/Login';
import Register from './page/Register';
import FullBank from './page/FullBank';
import AddBank from './page/AddBank';
import './App.css';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/banks/:id" element={<FullBank />} />
                <Route path="/add-bank" element={<AddBank />} />
            </Routes>
        </div>
    );
}

export default App;
