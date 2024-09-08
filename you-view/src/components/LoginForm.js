import React, { useState } from 'react';
import PropTypes from 'prop-types';
import lockImage from '../assets/Images/Lock.png';
import GoogleButton from 'react-google-button'; // Import here

const LoginForm = ({ login, loginLoading, onLoginSuccess, onSignupClick, googleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter both username and password.');
      return;
    }
    try {
      const { data } = await login({
        variables: { username: username.toLowerCase(), password },
      });

      if (data.login.message === 'Login successful') {
        setErrorMessage('');
        onLoginSuccess(data.login.token);
      } else {
        setErrorMessage(data.login.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      {errorMessage && (
        <p className="errorMessage">
          {errorMessage}
          <span className="closePopup" onClick={() => setErrorMessage('')}>
            &times;
          </span>
        </p>
      )}
      <h1 className='loginheader'>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="inputField"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="inputField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button login" disabled={loginLoading}>
          <img src={lockImage} alt="Lock" className="buttonIcon" />
          {loginLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button className="button signupbutton" onClick={onSignupClick}>
        Sign Up
      </button>
      <div className='google'>
        <GoogleButton
          onClick={googleLogin}
          className="googleLoginButton"
        >
          Login with Google
        </GoogleButton>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onSignupClick: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
