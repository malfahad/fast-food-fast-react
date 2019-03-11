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
});
