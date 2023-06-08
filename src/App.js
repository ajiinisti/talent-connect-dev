import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { AxiosInterceptor } from "./services/axios-client";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor>
          <AppRouter />
        </AxiosInterceptor>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
