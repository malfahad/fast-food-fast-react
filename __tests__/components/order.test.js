import React from 'react';
import { shallow } from 'enzyme';
import { Orders } from '../../src/components/Orders';

describe('<Orders/>', () => {
  it('should render empty order list without crashing', () => {
    const props = {
      fetchOrders: jest.fn(),
      orderHistory: {},
      user: {
        isAdmin: false,
      },
    };
    const wrapper = shallow(<Orders {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render orders list without crashing', () => {
    const props = {
      fetchOrders: jest.fn(),
      orderHistory: {
        1: {
          items: ['2x Fries - Ush 2000'],
          status: 'Created',
          total: 2000,
        },
      },
      user: {
        isAdmin: false,
      },
    };
    const wrapper = shallow(<Orders {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call updateorderStatus on chage selection', () => {
    const props = {
      fetchOrders: jest.fn(),
      updateOrderStatus: jest.fn(),
      orderHistory: {
        8: {
          items: ['2x Fries - Ush 2000'],
          status: 'Created',
          total: 2000,
        },
      },
      user: {
        isAdmin: false,
      },
    };
    const event = {
      preventDefault: jest.fn(),
      target: {
        1: { value: 'Confirmed', id: 8 },
        2: { value: 'Rejected', id: 8 },
        selectedIndex: 1,
      },

    };
    const wrapper = shallow(<Orders {...props} />);
    wrapper.instance().onStatus(event);
    expect(wrapper.instance().props.updateOrderStatus).toHaveBeenCalled();
  });


  it('should navigato to admin login on admin logout', () => {
    const props = {
      fetchOrders: jest.fn(),
      user: {
        isAdmin: true,
      },
      orderHistory: {},
      history: {
        push: jest.fn(),
      },
    };
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Orders {...props} />);
    wrapper.instance().logout(event);
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });


  it('should navigato to user login on user logout', () => {
    const props = {
      fetchOrders: jest.fn(),
      user: {
        isAdmin: false,
      },
      orderHistory: {},
      history: {
        push: jest.fn(),
      },
    };
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Orders {...props} />);
    wrapper.instance().logout(event);
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});
