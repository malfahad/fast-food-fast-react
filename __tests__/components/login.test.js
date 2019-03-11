import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/components/Login';

describe('<Login/>', () => {
  it('should render without crashing', () => {
    const props = {
      match:{
        path:'/login'
      },
      user: {
        authErrors: '',
      },
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should user login handleSubmit', () => {
    const props = {
      match:{
        path:'/login'
      },
      user: {
        authErrors: '',
      },
      authAction: jest.fn(),
      path: 'login',
    };
    const event = { preventDefault: jest.fn(), target: [{ value: 'test@email.com' }, { value: 'pass123' }] };
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('#form-user-login').simulate('submit', event);
    expect(wrapper.instance().props.authAction).toHaveBeenCalled();
  });

  it('should admin login handleSubmit', () => {
    const props = {
      match:{
        path:'/login'
      },
      user: {
        authErrors: '',
      },
      authAction: jest.fn(),
      path: '/admin/login',
    };
    const event = { preventDefault: jest.fn(), target: [{ value: 'test@email.com' }, { value: 'pass123' }] };
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('#form-user-login').simulate('submit', event);
    expect(wrapper.instance().props.authAction).toHaveBeenCalled();
  });

  it('should navigate to home on receive props', () => {
    const props = {
      match:{
        path:'/login'
      },
      user: {
        authErrors: '',
      },
      authAction: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    const nextProps = {
      user: {
        isLoggedIn: true,
        authorization: '123.123.123',
      },
    };
    const wrapper = shallow(<Login {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });


  it('should not navigate to home on receive props', () => {
    const props = {
      match:{
        path:'/login'
      },
      user: {
        authErrors: '',
      },
      authAction: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
    const nextProps = {
      user: {
        isLoggedIn: false,
      },
    };
    const wrapper = shallow(<Login {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.history.push).not.toHaveBeenCalled();
  });
});
