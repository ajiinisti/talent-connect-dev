import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import ProgramList from '../pages/programList/ProgramList';
import ProgramForm from '../pages/programForm/ProgramForm';
import ActivityList from '../pages/activityList/ActivityList';
import Layout from '../components/layout/Layout';
import ActivityForm from '../pages/activityForm/ActivityForm';
import ActivityDetail from '../pages/activityDetail/ActivityDetail';
import EvaluationScoring from '../pages/evaluationScoring/EvaluationScoring';
import EvaluationAspectForm from '../pages/evaluationAspectForm/EvaluationAspectForm';
import ProgramEvaluateParticipant from '../pages/programEvaluateParticipant/ProgramEvaluateParticipant';
import ProgramEvaluateParticipantDetail from '../pages/programEvaluateParticipantDetail/ProgramEvaluateParticipantDetail';
import MentorFeedback from '../pages/activityMentorFeedback/ActivityMentorFeedback';
import ParticipantEvaluation from '../pages/participantEvaluation/ParticipantEvaluation';
import EvaluationCategoryForm from '../pages/evaluationCategoryForm/EvaluationCategoryForm';


function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/' element={<Layout/>}>
            <Route path='program' element={<ProgramList />}/>
            <Route path='program/program-form' element={<ProgramForm />} />
            <Route path='program/program-form/:id' element={<ProgramForm />} />
            <Route path='program/activity-list' element={<ActivityList />} />
            <Route path='program/mentor-feedback/:id' element={<MentorFeedback />} />
            <Route path='program/activity-form' element={<ActivityForm />} />
            <Route path='program/activity-form/:id' element={<ActivityForm />} />
            <Route path='program/activity-detail/:id' element={<ActivityDetail/>} />
            <Route path='program/evaluate-participant/:id' element={<ProgramEvaluateParticipant/>} />
            <Route path='program/evaluate-participant/:id/:id' element={<ProgramEvaluateParticipantDetail/>} />
            <Route path='management' element={<ProgramList/>}/>
            <Route path='evaluations/:id' element={<ParticipantEvaluation/>}/>
            <Route path='evaluation-scoring' element={<EvaluationScoring/>}/>
            <Route path='evaluation-scoring/evaluation-category-form' element={<EvaluationCategoryForm/>}/>
            <Route path='evaluation-scoring/evaluation-category-form/:id' element={<EvaluationCategoryForm/>}/>
            <Route path='evaluation-scoring/evaluation-aspect-form' element={<EvaluationAspectForm/>}/>
            <Route path='evaluation-scoring/evaluation-aspect-form/:id' element={<EvaluationAspectForm/>}/>
            <Route path='settings' element={<ProgramList/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
  );
}

export default AppRouter;
