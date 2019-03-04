import React from 'react';
import { connect } from 'react-redux';
import sampleAction from '../actions/sampleAction';

const Menu = () => (<div>Menu Page</div>);

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, { sampleAction })(Menu);
