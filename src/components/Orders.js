import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../actions/orderActions';
import { AppHeader, OrderItem } from './Shared';

export class Orders extends React.Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

    logout = (e) => {
      e.preventDefault();
      localStorage.removeItem('ff-token');
      const loginPath = (this.props.user.isAdmin) ? '/admin/login' : '/login';
      this.props.history.push(loginPath);
    }

    render() {
      const { orderHistory } = this.props;
      const orders = Object.values(orderHistory);
      orders.reverse();
      const orderItems = orders.length < 1 ? <p>No past orders</p> : (
        <div>
          {
          orders.map(order => (
            <OrderItem
              status={order.status}
              total={order.total}
              itemList={order.items}
            />
          ))
        }
        </div>
      );

      return (
        <div>
          <AppHeader
            logout={this.logout}
            title="order History"
          />
          <div className="container">
            <div className="column-wide">
              <h3 className="heading">My Order history</h3>
              <div id="orders-list">
                {orderItems}
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
  orderHistory: state.ordersReducer.orders,
});

export default connect(mapStateToProps, {
  fetchOrders,
})(Orders);
