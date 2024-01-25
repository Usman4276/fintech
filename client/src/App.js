import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { useCookies } from "react-cookie";

function App() {
  // Seetting cookies
  const [cookies] = useCookies(["connect.sid"]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          {cookies ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Navigate to={"/"} />
          )}

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
