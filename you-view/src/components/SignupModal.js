import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SignupModal = ({ signup, signupLoading, onClose }) => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (signupUsername.length < 3) {
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
          username: signupUsername.toLowerCase(),
          email: signupEmail.toLowerCase(),
          password: signupPassword,
        },
      });

      if (data.createUser.email) {
        setSuccessMessage('Signup successful!');
        onClose();
      } else {
        setSignupErrorMessage('An error occurred during signup. Please try again.');
      }
    } catch (error) {
      const message = error.graphQLErrors[0]?.message || 'An error occurred during signup. Please try again.';
      setSignupErrorMessage(message);
      console.error(error);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <span className="modalCloseButton" onClick={onClose}>
          &times;
        </span>
        <h2>Sign Up</h2>
        {signupErrorMessage && (
          <p className="errorMessage">
            {signupErrorMessage}
            <span className="closePopup" onClick={() => setSignupErrorMessage('')}>
              &times;
            </span>
          </p>
        )}
        {successMessage && (
          <p className="successMessage">
            {successMessage}
            <span className="closePopup" onClick={() => setSuccessMessage('')}>
              &times;
            </span>
          </p>
        )}
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="inputField Signupmodal"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="inputField Signupmodal"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="inputField Signupmodal"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
          <button
            className="button signupbutton"
            type="submit"
            disabled={signupLoading}
          >
            {signupLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

SignupModal.propTypes = {
  signup: PropTypes.func.isRequired,
  signupLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
