import { FaBars } from 'react-icons/fa';
import { 
    EvaluationIconActive,
    EvaluationIconNonActive,
    EvaluationScoringIconActive,
    EvaluationScoringIconNonActive,
    LogoutIcon,
    // ProfileSettingsIconActive,
    // ProfileSettingsIconNonActive,
    ProgramIconActive, 
    ProgramIconNonActive, 
    TalentConnectLogo, 
    UserManagementIconActive,
    UserManagementIconNonActive
} from "../../assets"
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [activeNavLink, setActiveNavLink] = useState('');
    const {logout, getCurrentRole, getCurrentUser} = useAuth()
    const role = getCurrentRole()

    const activeNavbar = {
        backgroundColor: "#A684F2",
        color: "white",
        marginTop: '0.1rem',
        borderRadius:'4px', 
        border: "none",
        cursor:'pointer'
    }

    const notActiveNavbar = {
        color: "#9e9e9e",
        marginTop: '0.1rem',
        borderRadius:'5px',
        border: "none",
        cursor:'pointer', 
    }

    useEffect(() => {
        setActiveNavLink(location.pathname);
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <img src={TalentConnectLogo} alt="Logo" style={{ width: "55%"}}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <FaBars style={{ color: "#A684F2" }} />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <button 
                            className='btn'
                            style={
                                {
                                    ...(activeNavLink.includes('/program') ? activeNavbar: notActiveNavbar),
                                    marginTop: "10px"
                                }
                            }
                            onClick={() => navigate('/program')}
                        >
                            Program
                        </button>
                        {
                            role?.includes("admin") && 
                            <button 
                                className='btn'
                                style={activeNavLink.includes('/user-management') ? activeNavbar: notActiveNavbar}
                                onClick={() => navigate('/user-management')}
                            >
                                User Management
                            </button>
                        }
                        {
                            role?.includes("admin") && 
                            <button 
                                className='btn'
                                style={activeNavLink.includes('/evaluation-scoring') ? activeNavbar: notActiveNavbar}
                                onClick={() => navigate('/evaluation-scoring')}
                            >
                                Evaluation Management
                            </button>
                        }
                        {
                            role?.includes("participant") &&
                            <button 
                                className='btn'
                                style={activeNavLink.includes('/evaluations') ? activeNavbar: notActiveNavbar}
                                onClick={() => navigate('/evaluations')}
                            >
                                Evaluation
                            </button>
                        }
                        {/* <button 
                            className='btn'
                            style={activeNavLink.includes('/settings') ? activeNavbar: notActiveNavbar}
                        >
                            Change Password
                        </button> */}
                        <button 
                            className="btn" 
                            style={{
                                backgroundColor: '#F88379', 
                                marginTop: '0.1rem',
                                borderRadius:'5px', 
                                cursor:'pointer', 
                                color:"white"
                            }} onClick={()=> logout()}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
