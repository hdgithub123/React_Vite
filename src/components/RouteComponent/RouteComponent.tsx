import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from '../HomeComponent/HomeComponent';
import LoginComponent from '../LoginComponent/LoginComponent';
import LogoutComponent from '../LogoutComponent/LogoutComponent';
import RegisterComponent from '../RegisterComponent/RegisterComponent';

const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        {/* Các tuyến đường khác */}
      </Routes>
    </BrowserRouter>
  );
};


export default RouterComponent;
