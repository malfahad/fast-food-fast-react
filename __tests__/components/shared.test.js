import { shallow } from 'enzyme';
import React from 'react';

import Header, {
  AppHeader, OrderSummary, MenuForm, CustomerMenuButttons, OrderItem,
} from '../../src/components/Shared';

describe('Header', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('AppHeader', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AppHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('OrderSummary', () => {
  it('should render empty order without crashing', () => {
    const props = {
      orderSummary: [],
      total: 0,
    };
    const wrapper = shallow(<OrderSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without crashing', () => {
    const props = {
      orderSummary: [
        {
          title: 'Fries',
          count: 0,
          subTotal: 1000,
        },
      ],
      total: 1000,
    };
    const wrapper = shallow(<OrderSummary {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('MenuForm', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MenuForm />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('OrderItem', () => {
  it('should render without crashing', () => {
    const props = {
      itemList: [],
      status: 'Created',
    };
    const wrapper = shallow(<OrderItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CustomerMenuButtons', () => {
  it('should render add button without crashing', () => {
    const props = {
      id: 1,
      count: 0,
    };
    const wrapper = shallow(<CustomerMenuButttons {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render default without crashing', () => {
    const props = {
      count: 10,
    };
    const wrapper = shallow(<CustomerMenuButttons {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
