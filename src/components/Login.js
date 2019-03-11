import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import authAction from '../actions/authAction';

class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      localStorage.setItem('ff-token', nextProps.user.authorization);
      this.props.history.push('/');
    }
  }

    handleSubmit = (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      const payload = { email, password };
      this.props.authAction(true, payload);
    }

    render() {
      return (
        <div>
          <div className="header">
            <h1 className="heading main-title"> Fast Food Fast</h1>
            <h2 className="heading"> Order your food online </h2>
          </div>

          <div className="content">
            <form id="form-user-login" onSubmit={this.handleSubmit} className="form-login">
              <h5 className="heading">Sign into your account</h5>
              <p id="server-error" className="server-error">{this.props.user.authErrors}</p>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" id="email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" id="password" required />
              </div>
              <div className="form-group">
                <input type="submit" className="form-control submit" value="Login" id="submit" />
              </div>
              <p>
                {' '}
New user?
                <Link to="/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, { authAction })(Login);
