import React from 'react';
import {Redirect,Route} from 'react-router-dom';


const ProtectedRoute = (props)=>{
    if(localStorage.getItem('token'))
    return <Route {...props}/>
    else
    return <Redirect to={props.redirectPath}/>;
}

export default ProtectedRoute;