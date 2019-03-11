import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../../src/components/Menu';

describe('<Menu/>', () => {
  it('should render without crashing', () => {
    const props = {
      user: {
        isAdmin: false,
      },
      menuState: {
        menu: {},
        orderSummary: {},
        total: 0,
      },
      fetchMenuAction: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render admin menu without crashing', () => {
    const props = {
      user: {
        isAdmin: true,
      },
      menuState: {
        menu: {},
        orderSummary: {},
        total: 0,
      },
      fetchMenuAction: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call addToOrder on add', () => {
    const props = {
      user: {
        isAdmin: false,
      },
      menuState: {
        menu: {
          1: {
            title: 'Fries',
            image_url: 'http://path.to/image',
            amount: 1000,
          },
        },
        orderSummary: {},
        total: 0,
      },
      fetchMenuAction: jest.fn(),
      addToOrder: jest.fn(),
      removeFromOrder: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().onAdd({ target: { id: 1 } });
    expect(wrapper.instance().props.addToOrder).toHaveBeenCalled();
  });
  it('should remove token on logout', () => {
    const props = {
      user: {
        isAdmin: false,
      },
      history: {
        push: jest.fn(),
      },
      menuState: {
        menu: {
          1: {
            title: 'Fries',
            image_url: 'http://path.to/image',
            amount: 1000,
          },
        },
        orderSummary: {},
        total: 0,
      },
      fetchMenuAction: jest.fn(),
      addToOrder: jest.fn(),
      removeFromOrder: jest.fn(),
    };
    localStorage.setItem('ff-token', 'sample.token.123');
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().logout({ preventDefault: jest.fn() });
    expect(localStorage.getItem('ff-token')).toBeNull();
  });

  it('should call removeFromOrder on remove', () => {
    const props = {
      user: {
        isAdmin: false,
      },
      menuState: {
        menu: {
          1: {
            title: 'Fries',
            image_url: 'http://path.to/image',
            amount: 1000,
          },
        },
        orderSummary: {
          1: {
            count: 1,
          },
        },
        total: 0,
      },
      fetchMenuAction: jest.fn(),
      addToOrder: jest.fn(),
      removeFromOrder: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().onRemove({ target: { id: 1 } });
    expect(wrapper.instance().props.removeFromOrder).toHaveBeenCalled();
  });


  it('should call removeFromMenu on remove', () => {
    const props = {
      user: {
        isAdmin: true,
      },
      menuState: {
        menu: {
          1: {
            title: 'Fries',
            image_url: 'http://path.to/image',
            amount: 1000,
          },
        },
        orderSummary: {
          1: {
            count: 1,
          },
        },
        total: 0,
      },
      fetchMenuAction: jest.fn(),
      addToOrder: jest.fn(),
      removeFromMenu: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().onRemoveFromMenu({ target: { id: 1 } });
    expect(wrapper.instance().props.removeFromMenu).toHaveBeenCalled();
  });


  it('should call menuSubmit on form submit', () => {
    const props = {
      user: {
        isAdmin: true,
      },
      menuState: {
        menu: {},
      },
      fetchMenuAction: jest.fn(),
      addToMenu: jest.fn(),
      removeFromMenu: jest.fn(),
    };
    const event = {
      preventDefault: jest.fn(),
      target: [
        { value: 'Fries' },
        { value: 'Fries are good' },
        { value: '12000' },
        { value: '/path/to/img.jpg' },
      ],
    };
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().onMenuSubmit(event);
    expect(wrapper.instance().props.addToMenu).toHaveBeenCalled();
  });


  it('should call placeOrder on orderSubmit', () => {
    const props = {
      user: {
        isAdmin: true,
      },
      menuState: {
        menu: {},
        orderSummary: {
          1: { title: 'Fries', subTotal: 2000, count: 2 },
          2: { title: 'Soda', subTotal: 1000, count: 1 },
        },
        total: 3000,
      },
      fetchMenuAction: jest.fn(),
      addToMenu: jest.fn(),
      removeFromMenu: jest.fn(),
      placeOrder: jest.fn(),
    };
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Menu {...props} />);
    wrapper.instance().onOrderSubmit(event);
    expect(wrapper.instance().props.placeOrder).toHaveBeenCalled();
  });
});
