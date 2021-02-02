import "./App.css";
import Routes from "./routes";
import { AuthProvider } from "./components/contextapi/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;
