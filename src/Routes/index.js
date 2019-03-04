import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../components/Login';
import Menu from '../components/Menu';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/" redirectPath="/login" exact component={Menu} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
