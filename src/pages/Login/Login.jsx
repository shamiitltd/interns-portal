import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userData = await login({ email, password });
      // Redirect based on user role
      switch (userData.role) {
        case 'intern':
          navigate('/intern-dashboard');
          break;
        case 'scrummaster':
          navigate('/scrummaster-dashboard');
          break;
        case 'hr':
          navigate('/hr-dashboard');
          break;
        case 'teamlead':
          navigate('/teamlead-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome to SHAMIIT</h1>
        <p className="login-subtitle">Your platform for tracking performance and interacting with HR.</p>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">
              <p>Email</p>
              <input
                type="email"
                placeholder="Your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-group">
            <label className="input-label">
              <p>Password</p>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
              </div>
            </label>
          </div>
          <div className="extra-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <div className="button-group">
            <button className="login-button" type="submit">
              <span>Log in</span>
            </button>
          </div>
        </form>
        <p className="signup-text">Don't have an account?</p>
      </div>
    </div>
  );
}

export default Login;