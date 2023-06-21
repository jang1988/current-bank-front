import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './page/Main';
import { Login } from './page/Login';
import Register from './page/Register';
import FullBank from './page/FullBank';
import AddBank from './page/AddBank';
import './App.css';

function App() {
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
