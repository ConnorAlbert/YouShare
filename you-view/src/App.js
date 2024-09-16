import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import ViewPage from './components/ViewPage';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { UserProvider } from './server/UserContext'; // Import UserProvider
import { initGA, logPageView } from './analytics'; // Import analytics setup

const client = new ApolloClient({
  uri: 'https://youview-190cb1d0e6db.herokuapp.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

// Component to handle route changes
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(); // Log page view on route change
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA(); // Initialize Google Analytics
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider> {/* Wrap your app with UserProvider */}
        <Router>
          <AnalyticsTracker />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/viewPage" element={<ViewPage />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
