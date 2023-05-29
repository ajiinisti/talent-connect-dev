import './App.css';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/management' element={<Layout/>}/>
        <Route path='/evaluation-scoring' element={<Layout/>}/>
        <Route path='/settings' element={<Layout/>}/>
        <Route path='login' element={<Layout/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
