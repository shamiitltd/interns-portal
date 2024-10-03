import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      console.log('Attempting to log in with email:', email);
      const response = await axios.post('http://127.0.0.1:5000/api/login', { email, password });
      console.log('Login response:', response.data);

      if (!response.data || !response.data.token) {
        throw new Error('Invalid response from server');
      }

      const userData = response.data;

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log('Calling login function with userData:', userData);
      login(userData);
      console.log('Login successful, navigating based on role:', userData.role);

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
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'teamlead':
          navigate('/teamlead-dashboard');
          break;
        default:
          console.error('Unknown user role:', userData.role);
          setErrorMessage('Invalid user role');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data?.error || 'An error occurred during login. Please try again.');
      } else {
        console.error('Non-Axios error:', err);
        setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/password-reset');
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
            <a href="#" className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</a>
          </div>
          <div className="button-group">
            <button className="login-button" type="submit" disabled={loading}>
              <span>{loading ? 'Logging in...' : 'Log in'}</span>
            </button>
          </div>
        </form>
        <p className="signup-text">Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default Login;