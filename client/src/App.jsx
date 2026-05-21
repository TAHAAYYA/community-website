import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import MemberLogin from "./pages/MemberLogin";
import AdminLogin from "./pages/AdminLogin";
import Members from "./pages/Members";
import Events from "./pages/Events";
import News from "./pages/News";
import GuestLogin from "./pages/GuestLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;