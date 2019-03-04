import React from 'react';
import { connect } from 'react-redux';
import sampleAction from '../actions/sampleAction';

const Login = () => (<div>Login form</div>);

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, { sampleAction })(Login);
