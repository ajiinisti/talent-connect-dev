import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
