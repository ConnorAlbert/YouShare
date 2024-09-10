import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import ViewPage from './components/ViewPage';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { UserProvider } from './server/UserContext'; // Import UserProvider

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider> {/* Wrap your app with UserProvider */}
        <Router>
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
