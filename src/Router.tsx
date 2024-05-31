import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import HomePage from './pages/MainPage/HomePage.tsx';
import UserPage from './pages/UserPage/UserPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const AppRouter: React.FC = () => {
    const token = useSelector((state: RootState) => state.user.token);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="" element={token ? <Outlet /> : <Navigate to="/register" />} >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
