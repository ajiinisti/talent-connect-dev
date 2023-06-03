import { NavLink, useLocation } from "react-router-dom"
import { 
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
        <div className="d-flex flex-column align-items-center align-items-sm-start px-5 pt-5 text-secondary min-vh-100">
        <div>
            <img src={TalentConnectLogo} alt="Logo" />
        </div>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start font-bold" id="menu">
            <NavLink to="/home" exact activeclassname="active" >
                <div className="mt-4 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink.includes('/home') ? ProgramIconActive : ProgramIconNonActive}
                            className="icon-navbar" alt="Program Icon" />
                    </li>
                </div>
            </NavLink>
            <NavLink to="/management" activeclassname="active" >
                <div className="mt-1 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink.includes('/management') ? UserManagementIconNonActive : UserManagementIconActive}
                        className="icon-navbar" alt="User Management Icon" />
                    </li>
                </div>
            </NavLink>
            <NavLink to="/evaluation-scoring" activeclassname="active">
                <div className="mt-1 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink.includes('/evaluation-scoring') ? EvaluationScoringIconActive : EvaluationScoringIconNonActive}
                        className="icon-navbar" alt="Evaluation Scoring Icon" />
                    </li>
                </div> 
            </NavLink>
            <NavLink to="/settings" activeclassname="active">
                <div className="mt-1 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink.includes('/settings') ? ProfileSettingsIconActive : ProfileSettingsIconNonActive}
                        className="icon-navbar" alt="Settings Icon" />
                    </li>
                </div>
            </NavLink>
        </ul>
        <hr />
        <div className="dropdown pb-4">
            <button className="btn" style={{backgroundColor: '#F1FAFB', border:'#1FAFB', outline: 'none', cursor:'pointer'}}>
                <img src={LogoutIcon} alt="Profile Icon" />
            </button>
        </div>
        </div>
  );
}

export default Sidebar