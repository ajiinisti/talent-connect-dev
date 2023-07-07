import { useEffect, useState } from "react";
import {
  GoogleLoginLogo,
  LoginLogo,
  TalentConnectLogo,
} from "../../assets";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import useLogin from "./useLogin";

const Login = () => {
  const {
    // payload,
    loginHandler,
    loginGoogleHandler,
    onChangeHandler,
  } = useLogin();

  const [externalPopup, setExternalPopup] = useState(null);
  const onGoogleLogin = () => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = `GOOGLE Login`;
    const url = getGoogleUrl("/");
    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(async () => {
      try {
        if (!externalPopup) {
          timer && clearInterval(timer);
          return;
        }
        const currentUrl = externalPopup.location.href;
        if (!currentUrl) {
          return;
        }
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get("code");
        if (code) {
          await loginGoogleHandler(code)  
          externalPopup.close();
          setExternalPopup(null);
          timer && clearInterval(timer);
        }
      } catch (error) {}
    }, 500);
  }, [externalPopup]);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-6 d-flex flex-column justify-content-center align-items-center left-login">
          <div className="logo-login mb-5">
            <img src={TalentConnectLogo} alt="Logo" className="img-fluid"/>
          </div>
          <div>
            <h1>
              <b>Sign In</b>
            </h1>
          </div>
          <br />
          <div style={{ width: "70%" }}>
            <form onSubmit={(e) => loginHandler(e)}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="form-control login-form"
                  id="Email"
                  name="Email"
                  placeholder="Enter your email"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control login-form"
                  id="password"
                  name="Password"
                  placeholder="Enter your password"
                  onChange={(e) => onChangeHandler(e)}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary login-button login-form"
              >
                Sign In
              </button>
            </form>
          </div>
          <br />
          <div>
            <div className="text-with-horizontal-line">
              <div className="form-text">or sign in with</div>
            </div>
            <br></br>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                onClick={onGoogleLogin}
                style={{
                  backgroundColor: "white",
                  border: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <img src={GoogleLoginLogo} alt="Google Logo" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-6 d-flex flex-column justify-content-center align-items-center right-login">
          <img
            src={LoginLogo}
            alt="Login Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
