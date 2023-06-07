import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './LoginPage.css';
import lockImage from '../assets/Images/Lock.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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

  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        message
      }
    }
  `;

  const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        email
      }
    }
  `;

  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const [signup, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION);

  const handleLoginAttempt = async () => {
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });

      if (data.login.message === 'Login successful') {
        setSuccessMessage('Login successful!');
        // Save the token to local storage or a state management system
        navigate('/home'); // Redirect the user to the home page
      } else {
        setErrorMessage(data.login.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
      console.error(error);
    }
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    // Handle password reset logic using the resetEmail value
    console.log('Forgot password? for email:', resetEmail);
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

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          email: signupEmail,
          password: signupPassword,
        },
      });

      if (data.createUser.email) {
        setSuccessMessage('Signup successful!');
        // Save the token to local storage or a state management system
        // Redirect the user to the desired page, e.g., navigate("/home");
        navigate('/home');
      } else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup. Please try again.');
      console.error(error);
    }

    handleModalClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginAttempt();
  };

  return (
    <div className="loginPage">
      <div className="leftSection">
        <h1>YouShare</h1>
      </div>
      <div className="rightSection">
        <div className="formContainer">
          <h1>Log in</h1>
          {successMessage && (
            <p className="successMessage">
              {successMessage}
              <span className="closePopup" onClick={() => setSuccessMessage('')}>
                &times;
              </span>
            </p>
          )}
          {errorMessage && (
            <p className="errorMessage">
              {errorMessage}
              <span className="closePopup" onClick={() => setErrorMessage('')}>
                &times;
              </span>
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <p className="Username">Email</p>
            <input
              type="text"
              placeholder="Email"
              className="inputField"
              value={email}
              onChange={handleEmailChange}
            />
            <p className="Password">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="inputField"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" className="button login">
              <img src={lockImage} alt="Lock" className="buttonIcon" />
              <b>Log in</b>
            </button>
            <p>
              <span className="link" onClick={handleResetPassword}>
                Forgot Password?
              </span>
            </p>
          </form>
          <button className="button signupbutton" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>

      {showResetModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span className="modalCloseButton" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Forgot Password?</h2>
            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="inputField"
                value={resetEmail}
                onChange={handleResetEmailChange}
              />
              <button className="button signupbutton">Reset</button>
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
                className="inputField email"
                value={signupEmail}
                onChange={handleSignupEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="inputField password"
                value={signupPassword}
                onChange={handleSignupPasswordChange}
              />
              <button
                className="button signupbutton signupmodal"
                disabled={signupLoading}
              >
                {signupLoading ? 'Signing up...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
