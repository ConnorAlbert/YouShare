import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import LoginForm from './LoginForm';
import SignupModal from './SignupModal';
import '../styles/LoginPage.css';
import lockImage from '../assets/Images/Lock.png';
import Logo from '../assets/Images/logo-no-background.png'; 

const LoginPage = () => {
  const navigate = useNavigate();

  // State hooks
  const [showSignupModal, setShowSignupModal] = useState(false);

  // GraphQL mutations
  const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        message
        token
      }
    }
  `;

  const SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
        username
        email
      }
    }
  `;

  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const [signup, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    navigate('/home');
  };

  // Handler for test user login
  const handleTestUserLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          username: 'testuser',
          password: 'userfortest',
        },
      });

      if (data && data.login.token) {
        handleLoginSuccess(data.login.token);
      }
    } catch (error) {
      console.error('Error logging in as test user:', error);
    }
  };

  return (
    <div className="loginPage">
      <div className="header">
        <img src={Logo} alt="Logo" className="logoImage" />
      </div>
      <div className="mainContent">
        <div className="formContainer">
          {/* Test user login button */}
          <button className="login" onClick={handleTestUserLogin}>
            Log in as Test User
          </button>

          <LoginForm
            login={login}
            loginLoading={loginLoading}
            onLoginSuccess={handleLoginSuccess}
            onSignupClick={() => setShowSignupModal(true)}
          />
        </div>
      </div>
      {showSignupModal && (
        <SignupModal
          signup={signup}
          signupLoading={signupLoading}
          onClose={() => setShowSignupModal(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;
