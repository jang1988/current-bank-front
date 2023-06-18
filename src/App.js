import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './page/Main';
import { Login } from './page/Login';
import FullBank from './page/FullBank';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/banks/:id" element={<FullBank />} />
            </Routes>
        </div>
    );
}

export default App;
