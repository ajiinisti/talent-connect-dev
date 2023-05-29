import { NavLink, useLocation } from "react-router-dom"
import { DefaultProfileIcon, 
    EvaluationScoringIcon, 
    ProgramIcon, 
    SettingsIcon, 
    TalentConnectLogo, 
    UserManagementIcon, 
    WhiteEvaluationScoringIcon, 
    WhiteProgramIcon, 
    WhiteSettingsIcon, 
    WhiteUserManagementIcon} from "../../assets"
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
            <NavLink to="/" exact activeClassName="active" >
                <div className="mt-5 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink === '/' ? WhiteProgramIcon : ProgramIcon}
                            className="icon-navbar" alt="Program Icon" /> Programs
                    </li>
                </div>
            </NavLink>
            <NavLink to="/management" activeClassName="active" >
                <div className="mt-2 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink === '/management' ? WhiteUserManagementIcon : UserManagementIcon}
                        className="icon-navbar" alt="User Management Icon" /> User Management
                    </li>
                </div>
            </NavLink>
            <NavLink to="/evaluation-scoring" activeClassName="active">
                <div className="mt-2 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink === '/evaluation-scoring' ? WhiteEvaluationScoringIcon : EvaluationScoringIcon}
                        className="icon-navbar" alt="Evaluation Scoring Icon" /> Evaluation Scoring
                    </li>
                </div> 
            </NavLink>
            <NavLink to="/settings" activeClassName="active">
                <div className="mt-2 navbar-div-item" >
                    <li className="nav-item">
                        <img src={activeNavLink === '/settings' ? WhiteSettingsIcon : SettingsIcon}
                        className="icon-navbar" alt="Settings Icon" /> Settings
                    </li>
                </div>
            </NavLink>
        </ul>
        <hr />
        <div className="dropdown pb-4">
                <img src={DefaultProfileIcon} alt="Profile Icon" /> AJIIIII
        </div>
        </div>
  );
}

export default Sidebar