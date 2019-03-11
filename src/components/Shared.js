import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <h1 className="heading main-title"> Fast Food Fast</h1>
    <h2 className="heading"> Order your food online </h2>
  </div>
);

export const AppHeader = props => (
  <div>
    <div className="heading-main">
      <h1 className="heading">Fast Food Fast</h1>
      <h3 className="heading">{props.title}</h3>
      <ul>
        <li className="btn btn-default logout"><a id="user-logout" href="#" onClick={props.logout}>Logout</a></li>
        <li className="btn btn-default logout"><Link to="/orders">Order history</Link></li>
        <li className="btn btn-default logout"><Link to="/">Menu</Link></li>
      </ul>
    </div>

    <div className="gap" />

  </div>
);

export const OrderItem = props => (
  <div className="menu-item">
    <img className="menu-item-img" alt="order item" src="https://cdn2.iconfinder.com/data/icons/bar-2/64/padnote-order-restaurant-writing_tool-512.png" />
    <h4 className="heading menu-item-title"> Order number #100341 </h4>
    <ul>
      {props.itemList.map(item => <li>{item}</li>)}
    </ul>
    <p>
Total:
      {' '}
      {' '}
      <span>
Ush
        {props.total}
      </span>


    </p>
    <p>
Order Status:
      {' '}
      <span className="order-status completed">{props.status}</span>


    </p>
  </div>
);

export const OrderSummary = props => (
  <div className="column-small persist">
    <h3 className="heading">Order Summary </h3>
    <ul id="order-summary">
      {props.orderSummary.map(item => (
        <li key={`${item.title}${item.count}`}>{`${item.count}x ${item.title}  - ${item.subTotal}`}</li>
      ))}
    </ul>
    <h4 id="order-total">{props.total > 0 ? `Total Ush ${props.total}` : ''}</h4>
    <button id="order-submit" type="button" onClick={props.onOrderSubmit} className="menu-item-button" hidden={props.total === 0}>Submit Order</button>
  </div>
);

export const MenuForm = props => (
  <div className="column-small">
    <h3 className="heading">Add menu Item </h3>
    <form id="form-menu-item" onSubmit={props.onSubmit} action="/" encType="application/x-www-form-urlencoded">
      <p className="server-error" id="server-error" />
      <div className="form-group2 ">
        <input type="text" className="form-control2" placeholder="Menu Item Title" required id="menu-item-title" />
      </div>
      <div className="form-group2 ">
        <textarea type="text" className="form-control2" placeholder="Menu Item description" required id="menu-item-desc" />
      </div>
      <div className="form-group2 ">
        <input type="number" className="form-control2" placeholder="Amount" required id="menu-item-amount" />
      </div>
      <div className="form-group2 ">
        <small><label htmlFor="menu-item-img"> Menu Item Image: </label></small>
        <br />
        <input type="text" className="form-control2" placeholder="Menu Item Image url" id="menu-item-img" />
      </div>
      <div className="form-group2">
        <input type="submit" className="form-control submit" value="Create new" id="submit" />
      </div>
    </form>
  </div>
);

export const CustomerMenuButttons = props => (
  <div>
    <p className="item-counter">{props.count > 0 ? `${props.count} added` : ''}</p>
    <button id={props.id} type="button" className="menu-item-button" onClick={props.onAdd} hidden={props.count >= 10}>Add</button>
    <button id={props.id} type="button" className="menu-item-button" onClick={props.onRemove} hidden={props.count < 1}>Remove</button>
  </div>
);
export const AdminMenuButtons = props => (
  <div>
    <button id={props.id} type="button" className="menu-item-button" onClick={props.onRemoveFromMenu}>Remove from Menu</button>
  </div>
);


export default Header;
