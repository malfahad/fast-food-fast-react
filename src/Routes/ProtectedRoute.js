import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const ProtectedRoute = (props) => {
  if (localStorage.getItem('ff-token')) return <Route {...props} />;
  return <Redirect to={props.redirectPath} />;
};

export default ProtectedRoute;
