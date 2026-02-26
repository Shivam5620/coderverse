import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./feature/auth/Login";
import UserForm from "./feature/form/UserForm";
import UsersDashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UsersDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
