import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleButton } from 'react-google-button';
import './LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = () => {
    setShowResetModal(true);
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value);
  };

  const handleModalClose = () => {
    setShowResetModal(false);
    setShowSignupModal(false);
    setResetEmail('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const handleLoginAttempt = () => {
    navigate("/home"); 

  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic using the resetEmail value
    console.log('Reset password for email:', resetEmail);
    handleModalClose();
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setShowSignupModal(true);
  };

  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };

  const handleSignupPasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Handle signup logic using the signupEmail and signupPassword values
    console.log('Signup with email:', signupEmail);
    handleModalClose();
  };

  return (
    <div className="loginPage">
      <div className="leftSection">
        <h1>YouShare</h1>
      </div>
      <div className="rightSection">
        <div className="formContainer">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              placeholder="Username"
              className="inputField"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="inputField"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="button" onClick={handleLoginAttempt}>Login</button>
            <p>
              <span className="link" onClick={handleResetPassword}>
                Reset Password
              </span>
            </p>
            <button className="button" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {showResetModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="modalCloseButton" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="inputField"
                value={resetEmail}
                onChange={handleResetEmailChange}
              />
              <button className="button">Reset</button>
            </form>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="modalCloseButton" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="inputField"
                value={signupEmail}
                onChange={handleSignupEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="inputField"
                value={signupPassword}
                onChange={handleSignupPasswordChange}
              />
              <button className="button">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;