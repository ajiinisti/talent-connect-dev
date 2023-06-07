import { NavLink, useLocation } from "react-router-dom"
import { 
    EvaluationIconActive,
    EvaluationIconNonActive,
    EvaluationScoringIconActive,
    EvaluationScoringIconNonActive,
    LogoutIcon,
    ProfileSettingsIconActive,
    ProfileSettingsIconNonActive,
    ProgramIconActive, 
    ProgramIconNonActive, 
    TalentConnectLogo, 
    UserManagementIconActive,
    UserManagementIconNonActive
} from "../../assets"
import { useEffect, useState } from "react";

const Sidebar = () => {
    const location = useLocation();
    const [activeNavLink, setActiveNavLink] = useState('');
    
    useEffect(() => {
        setActiveNavLink(location.pathname);
    }, [location]);

    return (
        <div className="sidebar d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="mt-5">
                <img src={TalentConnectLogo} alt="Logo" className="img-fluid"/>
            </div>
            <ul className="nav flex-column mb-sm-auto align-items-center" id="menu">
                <NavLink to="/program" activeclassname="active" >
                    <div className="mt-4 navbar-div-item" >
                        <li>
                            <img src={activeNavLink.includes('/program') ? ProgramIconActive : ProgramIconNonActive}
                                className="img-fluid" alt="Program Icon" />
                        </li>
                    </div>
                </NavLink>
                <NavLink to="/user-management" activeclassname="active" >
                    <div className="mt-1 navbar-div-item" >
                        <li>
                            <img src={activeNavLink.includes('/user-management') ? UserManagementIconNonActive : UserManagementIconActive}
                            className="img-fluid" alt="User Management Icon" />
                        </li>
                    </div>
                </NavLink>
                <NavLink to="/evaluation-scoring" activeclassname="active">
                    <div className="mt-1 navbar-div-item" >
                        <li>
                            <img src={activeNavLink.includes('/evaluation-scoring') ? EvaluationScoringIconActive : EvaluationScoringIconNonActive}
                            className="img-fluid" alt="Evaluation Scoring Icon" />
                        </li>
                    </div> 
                </NavLink>
                <NavLink to="/evaluations/id" activeclassname="active">
                    <div className="mt-1 navbar-div-item" >
                        <li>
                            <img src={activeNavLink.includes('/evaluations') ? EvaluationIconActive : EvaluationIconNonActive}
                            className="img-fluid" alt="Evaluation Scoring Icon" />
                        </li>
                    </div> 
                </NavLink>
                <NavLink to="/settings" activeclassname="active">
                    <div className="mt-1 navbar-div-item" >
                        <li>
                            <img src={activeNavLink.includes('/settings') ? ProfileSettingsIconActive : ProfileSettingsIconNonActive}
                            className="img-fluid" alt="Settings Icon" />
                        </li>
                    </div>
                </NavLink>
            </ul>
            <hr />
            <div className="pb-4">
                <button className="btn" style={{backgroundColor: '#F1FAFB', border:'#1FAFB', outline: 'none', cursor:'pointer'}}>
                    <img src={LogoutIcon} className="img-fluid" alt="Profile Icon"/>
                </button>
            </div>
        </div>
  );
}

export default Sidebar