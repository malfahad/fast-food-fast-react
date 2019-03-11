import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import authAction from '../actions/authAction';

class Register extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      localStorage.setItem('ff-token', nextProps.user.authorization);
      this.props.history.push('/');
    }
  }

    handleSubmit = (e) => {
      e.preventDefault();
      const fullName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const payload = {
        'full name': fullName,
        email,
        password,
      };
      this.props.authAction(false, payload);
    }

    render() {
      return (
        <div>
          <div className="header">
            <h1 className="heading main-title"> Fast Food Fast</h1>
            <h2 className="heading"> Order your food online </h2>
          </div>

          <div className="content">

            <form id="form-user-signup" onSubmit={this.handleSubmit} className="form-login" action="/">
              <h5 className="heading">Register a new account </h5>
              <p id="server-error" className="server-error">{this.props.user.authErrors}</p>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Full name" id="full_name" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" id="email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" id="password" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Repeat password" id="password2" required />
              </div>
              <div className="form-group">
                <input type="submit" className="form-control submit" value="Sign up" id="submit" />
              </div>
              <p>
                {' '}
Already registered?
                <Link to="/login">Sign in</Link>
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

export default connect(mapStateToProps, { authAction })(Register);
