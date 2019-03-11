import React from 'react';
import { connect } from 'react-redux';
import {
  AppHeader, OrderSummary, MenuForm, CustomerMenuButttons,
} from './Shared';
import fetchMenuAction from '../actions/menuAction';
import { addToOrder, removeFromOrder } from '../actions/orderActions';

export class Menu extends React.Component {
  componentWillMount() {
    this.props.fetchMenuAction();
  }

  onRemove = e => this.props.removeFromOrder(e.target.id);

  onAdd = e => this.props.addToOrder(e.target.id);

  render() {
    const { isAdmin } = this.props.user;
    const { menu, orderSummary, total } = this.props.menuState;
    const menuIds = Object.keys(menu);

    const menuItems = menuIds.map(key => (
      <div className="menu-item" key={key}>
        <img className="menu-item-img" src={menu[key].image_url} alt="menu item" />
        <h4 className="heading menu-item-title">
          {' '}
          {menu[key].title}
          {' '}
        </h4>
        <p>
          {' '}
          {menu[key].description}
          {' '}
        </p>
        <p className="item-price">
UGX
          {' '}

          {menu[key].amount}

        </p>
        <CustomerMenuButttons
          id={key}
          count={Object.prototype.hasOwnProperty.call(orderSummary, key)
            ? orderSummary[key].count : 0}
          onRemove={this.onRemove}
          onAdd={this.onAdd}
        />
      </div>
    ));

    const leftPane = isAdmin ? <MenuForm /> : (
      <OrderSummary
        orderSummary={Object.values(orderSummary)}
        total={total}
      />
    );

    return (
      <div>
        <AppHeader />
        <div className="container">
          {leftPane}
          <div className="column-main">
            <h3 className="heading">Restaurant Menu</h3>
            <p> This is the current fast food fast items menu.</p>
            <div id="menu">
              {menuItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  menuState: state.menuReducer,
});

export default connect(mapStateToProps, {
  fetchMenuAction,
  addToOrder,
  removeFromOrder,
})(Menu);
