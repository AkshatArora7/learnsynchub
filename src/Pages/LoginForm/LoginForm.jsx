import React, { useState } from "react";
import "./LoginForm.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import loadingGIF from "../../Components/Assets/loading.gif";
import { useAuth } from "../../auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, handleForgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      navigate('/'); 
    } catch (error) {
        console.error("Error logging in:", error.message);
      
      
    }

    setLoading(false);
  };

  const storedAuth = localStorage.getItem("isAuthenticated");

  if (storedAuth === "true") {
    return <Navigate to="/" />;
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
              type="password"
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
            <p className="forgotPassword" onClick={() => setShowResetPasswordModal(true)}>Forgot Password?</p>
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
      {showResetPasswordModal && (
        <div className="modal">
          <div className="modal__content">
            <span className="modal__close" onClick={() => setShowResetPasswordModal(false)}>&times;</span>
            <h2>Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleForgotPassword}>Send Reset Email</button>
          </div>
        </div>
      )}

    </div>

  );
};

export default LoginForm;
