import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from '../HomeComponent/HomeComponent';
import UserComponent from '../UserComponent/UserComponent';
import RegisterComponent from '../RegisterComponent/RegisterComponent';

const RouterComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<UserComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        {/* Các tuyến đường khác */}
      </Routes>
    </BrowserRouter>
  );
};


export default RouterComponent;
