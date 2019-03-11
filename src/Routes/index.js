import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import Menu from '../components/Menu';
import ProtectedRoute from './ProtectedRoute';
import Register from '../components/Register';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin/login" component={Login} />
      <Route path="/signup" component={Register} />
      <ProtectedRoute path="/" redirectPath="/login" exact component={Menu} />
    </Switch>
  </Router>
);

export default Routes;
