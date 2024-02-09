import React, { useState } from "react";
import "./LoginForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import loadingGIF from "../Assets/loading.gif";
import { useAuth } from "../../auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when login starts

    try {
      await login(email, password, rememberMe);
      navigate('/'); 
    } catch (error) {
        console.error("Error logging in:", error.message);
      
      
    }

    setLoading(false); // Set loading state to false when login completes
  };

   if (isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="login">
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="login__inputBox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="login__icon" />
          </div>
          <div className="login__inputBox">
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="login__icon" />
          </div>
          <div className="login__rememberForget">
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button className="login__submitBtn" type="submit">
            {loading ? <img src={loadingGIF} alt="Loading..." /> : "Login"}
          </button>
          <div className="login__registerLink">
            <p>
              Don't have an account? <Link to="/register">Register</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
