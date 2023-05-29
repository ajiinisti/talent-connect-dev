import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import ProgramList from './pages/programList/ProgramList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProgramList/>}/>
        <Route path='/management' element={<ProgramList/>}/>
        <Route path='/evaluation-scoring' element={<ProgramList/>}/>
        <Route path='/settings' element={<ProgramList/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
