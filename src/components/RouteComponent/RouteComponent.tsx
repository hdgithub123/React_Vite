// RouterComponent.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from '../HomeComponent/HomeComponent';
import UserComponent from '../UserComponent/UserComponent';
import RegisterComponent from '../RegisterComponent/RegisterComponent';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/user" component={UserComponent} />
        <Route path="/register" component={RegisterComponent} />
        {/* Các tuyến đường khác */}
      </Switch>
    </Router>
  );
};

export default RouterComponent;
