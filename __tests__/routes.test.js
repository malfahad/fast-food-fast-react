import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../src/Routes/index';
import ProtectedRoute from '../src/Routes/ProtectedRoute';

describe('Routes', () => {
  it('should render routes without crashing', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render protected routes without crashing', () => {
    const wrapper = shallow(<ProtectedRoute path="/" redirectPath="/login" />);
    expect(wrapper).toMatchSnapshot();
  });
});
