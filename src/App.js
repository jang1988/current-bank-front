
import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <div className="App">
          <Header />
            <Routes>
              <Route path='/' element={<Main />} />
                
            </Routes>
        </div>
    );
}

export default App;
