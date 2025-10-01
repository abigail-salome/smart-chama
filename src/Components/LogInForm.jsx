import React, { useState } from "react";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
import "./LogInForm.css"

const initialInput = { email: "", password: "" };

const LogInForm = () => {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState("");
  const { handleLogIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      setError("Please fill out the empty field")
      return;
    }
    try {
      await handleLogIn(input.email, input.password);

      setInput({ email: "", password: "" });
      navigate("/register-group");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h4>Welcome Back</h4>
          <div>
            <label htmlFor="email" className="hidden">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={input.email}
              onChange={(e) => {setInput({ ...input, email: e.target.value }); setError("")}}
            />
          </div>
          <div>
            <label htmlFor="password" className="hidden">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={input.password}
              onChange={(e) => {setInput({ ...input, password: e.target.value }); setError("")}}
            />
          </div>

          <button type="submit" className="log-in-button">Log In</button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </fieldset>
      </form>
    </div>
  );
};

export default LogInForm;
