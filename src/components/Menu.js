import React from 'react';
import { connect } from 'react-redux';
import {
  AppHeader, OrderSummary, MenuForm, AdminMenuButtons, CustomerMenuButttons,
} from './Shared';
import fetchMenuAction, { removeFromMenu, addToMenu } from '../actions/menuAction';
import { addToOrder, removeFromOrder, placeOrder } from '../actions/orderActions';

export class Menu extends React.Component {
  componentWillMount() {
    this.props.fetchMenuAction();
  }

  onRemove = e => this.props.removeFromOrder(e.target.id);

  onAdd = e => this.props.addToOrder(e.target.id);

  onRemoveFromMenu = e => this.props.removeFromMenu(e.target.id);

  onOrderSubmit = (e) => {
    e.preventDefault();
    const { orderSummary, total } = this.props.menuState;
    const items = Object.values(orderSummary).map(item => (
      `${item.count}x ${item.title} - ${item.subTotal}`
    ));
    const status = 'Created';
    const payload = { items, total, status };
    this.props.placeOrder(payload);
  }

  onMenuSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const amount = e.target[2].value;
    const imgUrl = e.target[3].value;
    const body = {
      title, description, amount, img_url: imgUrl,
    };
    this.props.addToMenu(body);
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('ff-token');
    localStorage.removeItem('ff-admin');
    const loginPath = (this.props.user.isAdmin) ? '/admin/login' : '/login';
    this.props.history.push(loginPath);
  }

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
        {isAdmin ? (
          <AdminMenuButtons
            id={key}
            onRemoveFromMenu={this.onRemoveFromMenu}
          />
        ) : (
          <CustomerMenuButttons
            id={key}
            count={Object.prototype.hasOwnProperty.call(orderSummary, key)
              ? orderSummary[key].count : 0}
            onRemove={this.onRemove}
            onAdd={this.onAdd}
          />
        )}

      </div>
    ));

    const leftPane = isAdmin
      ? (
        <MenuForm
          onSubmit={this.onMenuSubmit}
        />
      ) : (
        <OrderSummary
          onOrderSubmit={this.onOrderSubmit}
          orderSummary={Object.values(orderSummary)}
          total={total}
        />
      );

    return (
      <div>
        <AppHeader logout={this.logout} />
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
  removeFromMenu,
  addToMenu,
  placeOrder,
})(Menu);
