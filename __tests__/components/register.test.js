import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../src/components/Register';

describe('<Register/>', () => {
  it('should render without crashing', () => {
    const props = {
      user: {
        authErrors: '',
      },
    };
    const wrapper = shallow(<Register {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleSubmit', () => {
    const props = {
      user: {
        authErrors: '',
      },
      authAction: jest.fn(),
    };
    const event = { preventDefault: jest.fn(), target: [{ value: 'full name' }, { value: 'test@email.com' }, { value: 'pass123' }] };
    const wrapper = shallow(<Register {...props} />);
    wrapper.find('#form-user-signup').simulate('submit', event);
    expect(wrapper.instance().props.authAction).toHaveBeenCalled();
  });

  it('should navigate to home on receive props', () => {
    const props = {
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
    const wrapper = shallow(<Register {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });


  it('should not navigate to home on receive props', () => {
    const props = {
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
    const wrapper = shallow(<Register {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.history.push).not.toHaveBeenCalled();
  });
});
