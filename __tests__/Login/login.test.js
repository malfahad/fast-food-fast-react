import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../src/components/Login';

describe('login', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });
});
