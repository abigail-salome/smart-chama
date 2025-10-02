import React from "react";
import { useState } from "react";

import LogInForm from "./LogInForm.jsx";
import { useAuth } from "../Context/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const initialInput = { fullName: "", email: "", password: "" };

const SignUpForm = () => {
  const [input, setInput] = useState(initialInput);
  const [showLogIn, setShowLogIn] = useState(false);
  const [error, setError] = useState("");
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!input.fullName || !input.email || !input.password) {
        setError("Please fill out the empty field");
        return;
      }

      const newUser = await handleSignUp(
        input.fullName,
        input.email,
        input.password
      );
      console.log("Signed up and logged in:", newUser);
      setInput(initialInput);
      // redirect to register group page
      navigate("/register-group");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <div>
      {!showLogIn && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h4>Sign Up</h4>
            <div>
              <label htmlFor="fullname" className="hidden">
                Fullname
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="Fullname"
                value={input.fullName}
                onChange={(e) =>
                  setInput({ ...input, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={input.email}
                placeholder="Email"
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={input.password}
                placeholder="Password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="sign-up-button">
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <button
                className="login-button"
                onClick={() => setShowLogIn(true)}
              >
                Log in
              </button>
            </p>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </fieldset>
        </form>
      )}

      {showLogIn && <LogInForm />}
    </div>
  );
};

export default SignUpForm;
