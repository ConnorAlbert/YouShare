import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './LoginPage.css';
import lockImage from '../assets/Images/Lock.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

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
    setUsername('');
    setErrorMessage('');
    setSignupErrorMessage('');
  };

  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        message
      }
    }
  `;

  const SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 3) {
      setSignupErrorMessage('Username must be at least 3 characters long.');
      return;
    }
    if (signupPassword.length < 5) {
      setSignupErrorMessage('Password must be at least 5 characters long.');
      return;
    }
  
    try {
      const { data } = await signup({
        variables: {
          username,
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
        setSignupErrorMessage('An error occurred during signup. Please try again.');
      }
    } catch (error) {
      setSignupErrorMessage('An error occurred during signup. Please try again.');
      console.error(error);
    }
  
    handleModalClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    handleLoginAttempt();
  };

  return (
    <div className="loginPage">
      <div className="leftSection">
        <h1>YouShare</h1>
      </div>
      <div className="rightSection">
      <Link to="http://localhost:4000/api/auth/google" className="googleLoginButton">
          LOGIN WITH GOOGLE
      </Link>
        <div className="formContainer">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <p className="Username">Email</p>
            <input
              type="text"
              placeholder="Email"
              className="inputField"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <p className="Password">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="inputField"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit" className="button login">
              <img src={lockImage} alt="Lock" className="buttonIcon" />
              <b>Log in</b>
            </button>
            {errorMessage && (
              <p className="errorMessage">
                {errorMessage}
                <span className="closePopup" onClick={() => setErrorMessage('')}>
                  &times;
                </span>
              </p>
            )}
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
                required
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
                type="text"
                placeholder="Username"
                className="inputField Signupmodal"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="inputField Signupmodal"
                value={signupEmail}
                onChange={handleSignupEmailChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="inputField Signupmodal"
                value={signupPassword}
                onChange={handleSignupPasswordChange}
                required
              />
              {signupErrorMessage && (
                <p className="errorMessage">
                  {signupErrorMessage}
                  <span className="closePopup" onClick={() => setSignupErrorMessage('')}>
                    &times;
                  </span>
                </p>
              )}
              <button
                className="button signupbutton Signupmodal"
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
