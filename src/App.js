import { HashRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { AxiosInterceptor } from "./services/axios-client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AxiosInterceptor>
          <AppRouter />
        </AxiosInterceptor>
      </AuthProvider>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
