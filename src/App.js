import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import FullBank from './page/FullBank';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/banks/:id" element={<FullBank />} />
            </Routes>
        </div>
    );
}

export default App;
