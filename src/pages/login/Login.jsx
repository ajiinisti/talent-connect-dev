import { GoogleLoginLogo, LoginLogo } from "../../assets";

const Login = () => {
    return (
        <div className="container-fluid" style={{ height: "100vh" }}>
            <div className="row h-100">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <h1><b>Sign In</b></h1>
                    </div>
                    <br/>
                    <div style={{width:'70%'}}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control login-form" id="exampleInputEmail1" placeholder="Enter your email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control login-form" id="exampleInputPassword1" placeholder="Enter your password" />
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary login-button login-form">Sign In</button>
                        </form>
                    </div>
                    <br/>
                    <div>
                        <div className="text-with-horizontal-line">
                            <div className="form-text">or sign in with</div>
                        </div>
                        <br></br>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <button style={{backgroundColor: 'white', border:'white', outline: 'none', cursor:'pointer'}}>
                                <img src={GoogleLoginLogo}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center right-login">
                    <img src={LoginLogo} alt="Login Logo" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            </div>
        </div>
    )
}

export default Login;
