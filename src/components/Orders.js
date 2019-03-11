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
                <OrderItem />

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
  fetchOrders,
})(Orders);
