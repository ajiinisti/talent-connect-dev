import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import ProgramList from '../pages/programList/ProgramList';
import ProgramForm from '../pages/programForm/ProgramForm';
import ActivityList from '../pages/activityList/ActivityList';
import Layout from '../components/layout/Layout';
import ActivityForm from '../pages/activityForm/ActivityForm';
import ActivityDetail from '../pages/activityDetail/ActivityDetail';
import EvaluationScoring from '../pages/evaluationScoring/EvaluationScoring';


function AppRouter() {
  return (
    <Routes>
        <Route path='home' element={<Layout/>}>
            <Route path='program' element={<ProgramList />}/>
            <Route path='program/program-form' element={<ProgramForm />} />
            <Route path='program/program-form/:id' element={<ProgramForm />} />
            <Route path='program/activity-list' element={<ActivityList />} />
            <Route path='program/activity-form' element={<ActivityForm />} />
            <Route path='program/activity-form/:id' element={<ActivityForm />} />
            <Route path='program/activity-detail/:id' element={<ActivityDetail/>} />
            <Route path='management' element={<ProgramList/>}/>
            <Route path='evaluation-scoring' element={<EvaluationScoring/>}/>
            <Route path='settings' element={<ProgramList/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
  );
}

export default AppRouter;
