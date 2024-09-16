// src/analytics.js
import ReactGA from 'react-ga';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize('G-2HXGWRYRFZ'); // Replace with your Google Analytics Measurement ID
};

// Log page views
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
