import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import ProgramList from '../pages/programList/ProgramList';
import ProgramForm from '../pages/programForm/ProgramForm';
import ActivityList from '../pages/activityList/ActivityList';
import Layout from '../components/layout/Layout';


function AppRouter() {
  return (
    <Routes>
        <Route path='home' element={<Layout/>}>
            <Route path='program' element={<ProgramList />}/>
            <Route path='program-form' element={<ProgramForm />} />
            <Route path='program-form/:id' element={<ProgramForm />} />
            <Route path='activity-list' element={<ActivityList />} />
            <Route path='management' element={<ProgramList/>}/>
            <Route path='evaluation-scoring' element={<ProgramList/>}/>
            <Route path='settings' element={<ProgramList/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
  );
}

export default AppRouter;
