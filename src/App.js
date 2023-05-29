import './App.css';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/management' element={<Login/>}/>
        <Route path='/evaluation-scoring' element={<Login/>}/>
        <Route path='/settings' element={<Login/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
