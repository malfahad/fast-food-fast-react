import React from 'react';

const Header = () => (
  <div className="header">
    <h1 className="heading main-title"> Fast Food Fast</h1>
    <h2 className="heading"> Order your food online </h2>
  </div>
);

export const AppHeader = () => (
  <div>

    <div className="heading-main">
      <h1 className="heading">Fast Food Fast</h1>
      <h3 className="heading">Order page</h3>
      <ul>
        <li className="btn btn-default logout"><a id="user-logout" href="login.html">Logout</a></li>
        <li className="btn btn-default logout"><a href="orders-history.html">Order history</a></li>
      </ul>
    </div>

    <div className="gap" />

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
    <button id="order-submit" type="button" className="menu-item-button" hidden={props.total === 0}>Submit Order</button>
  </div>
);

export const MenuForm = () => (
  <div className="column-small">
    <h3 className="heading">Add menu Item </h3>
    <form id="form-menu-item" method="post" action="/" encType="application/x-www-form-urlencoded">
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


export default Header;
