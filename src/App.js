import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import ProgramList from './pages/programList/ProgramList';
import ActivityList from './pages/activityList/ActivityList';
import ProgramForm from './pages/programForm/ProgramForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<ProgramList />} />
        <Route path='home/program-form' element={<ProgramForm />} />
        <Route path='home/activity-list' element={<ActivityList />} />
        <Route path='management' element={<ProgramList/>}/>
        <Route path='evaluation-scoring' element={<ProgramList/>}/>
        <Route path='settings' element={<ProgramList/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
