import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    width: '100%',
  },
  logo: {
    /* Add your logo styles here */
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  loginBtn: {
    /* Add your button styles here */
  },
};

const LandingPageHeader = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>YouShare</div>
      <nav>
        <ul style={styles.navLinks}>
          <li>
            <a style={styles.navLink} href="/">Home</a>
          </li>
          <li>
            <a style={styles.navLink} href="/about">About</a>
          </li>
          <li>
            <a style={styles.navLink} href="/faq">FAQ</a>
          </li>
          <li>
            <a style={styles.navLink} href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <Link to="/login">
      <button style={styles.loginBtn}>Log In</button>
      </Link>
    </header>
  );
};

export default LandingPageHeader;
