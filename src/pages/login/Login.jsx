import { 
    // GoogleLoginLogo, 
    LoginLogo 
} from "../../assets";
import useLogin from "./useLogin";

const Login = () => {
    const {
        // payload, 
        loginHandler, 
        onChangeHandler
    } = useLogin()
    return (
        <div className="container-fluid" style={{ height: "100vh" }}>
            <div className="row h-100">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <h1><b>Sign In</b></h1>
                    </div>
                    <br/>
                    <div style={{width:'70%'}}>
                        <form onSubmit={(e)=>loginHandler(e)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input required type="email" className="form-control login-form" id="Email" name="Email"  placeholder="Enter your email" onChange={(e)=>onChangeHandler(e)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input required type="password" className="form-control login-form" id="password" name="Password" placeholder="Enter your password" onChange={(e)=>onChangeHandler(e)}/>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary login-button login-form">Sign In</button>
                        </form>
                    </div>
                    <br/>
                    {/* <div>
                        <div className="text-with-horizontal-line">
                            <div className="form-text">or sign in with</div>
                        </div>
                        <br></br>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <button style={{backgroundColor: 'white', border:'white', outline: 'none', cursor:'pointer'}}>
                                <img src={GoogleLoginLogo} alt="Google Logo"/>
                            </button>
                        </div>
                    </div> */}
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center right-login">
                    <img src={LoginLogo} alt="Login Logo" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            </div>
        </div>
    )
}

export default Login;
