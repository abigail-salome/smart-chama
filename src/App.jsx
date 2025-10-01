import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import LogInForm from "./Components/LogInForm";
import SignUpForm from "./Components/SignUpForm";

import RegisterGroupPage from "./Pages/RegisterGroupPage";
import MemberDashboard from "./Pages/MemberDashboard";
import AdminDashboard from "./Pages/AdminDashboard";

import PrivateRoute from "./Routes/PrivateRoute";
import RoleBasedRoute from "./Routes/RoleBasedRoute";
import { AuthProvider } from "./Context/AuthContext.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />

          {/* Protected route (any logged-in user) */}
          <Route
            path="/register-group"
            element={
              <PrivateRoute>
                <RegisterGroupPage />
              </PrivateRoute>
            }
          />

          {/* Member + Admin can access */}
          <Route
            path="/member/:groupId"
            element={
              <RoleBasedRoute allowedRoles={["member", "admin"]}>
                <MemberDashboard />
              </RoleBasedRoute>
            }
          />

          {/* Only Admins can access */}
          <Route
            path="/admin/:groupId"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
