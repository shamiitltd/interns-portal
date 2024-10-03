import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Function to handle the actual password reset request
  const resetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { email });
      setError('');
      setSuccess(response.data.success);

      // Redirect after a delay if successful
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      // Handling case where response or error message is undefined
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSuccess('');
    }
  };

  const handleReset = () => {
    if (!email) {
      setError('Email is required');
      setSuccess('');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Please enter a valid email');
      setSuccess('');
    } else {
      resetPassword();  // Call the async function when validation passes
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="branding">
          <h1 className="company-name">SHAMIIT</h1>
        </div>

        <h2 className="reset-title">Reset Password</h2>
        <p className="instruction-text">Enter your email to receive a password reset link.</p>

        {/* Input field with label */}
        <div className="input-group">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            className={`input-field ${error ? 'error-border' : ''}`}
            placeholder="   Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            aria-required="true"
          />
        </div>

        {/* Error message display */}
        {error && <p className="error-text" role="alert">{error}</p>}

        {/* Success message display */}
        {success && <p className="success-text" role="status">{success}</p>}

        {/* Buttons */}
        <div className="button-group">
          <button className="back-button" onClick={handleBack}>Back</button>
          <button className="reset-button" onClick={handleReset}>Send Reset Link</button>
        </div>

        {/* Security note */}
        <p className="security-note">
          For security reasons, the reset link will be sent to the email address you provide.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
