import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';


const App = () => {
    return (
        <Router>
            <div >
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
