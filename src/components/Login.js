import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import authAction from '../actions/authAction';

export class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn) {
      localStorage.setItem('ff-token', nextProps.user.authorization);
      if (this.props.match.path.includes('admin')) {
        localStorage.setItem('ff-admin', nextProps.user.authorization);
      }
      this.props.history.push('/');
    }
  }

    handleSubmit = (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      const payload = { email, password };
      if (this.props.match.path.includes('admin')) {
        this.props.authAction('admin/login', payload);
      } else {
        this.props.authAction('login', payload);
      }
    }

    render() {
      const heading = (this.props.match.path === '/admin/login') ? 'Admin login' : 'Sign into your account';

      return (
        <div>
          <div className="header">
            <h1 className="heading main-title"> Fast Food Fast</h1>
            <h2 className="heading"> Order your food online </h2>
          </div>

          <div className="content">
            <form id="form-user-login" onSubmit={this.handleSubmit} className="form-login">
              <h5 className="heading">{heading}</h5>
              <p id="server-error" className="server-error">{this.props.user.authErrors}</p>
              <div className="form-group">
                <input type={(this.props.match.path === '/admin/login') ? 'text' : 'email'} className="form-control" placeholder={(this.props.match.path === '/admin/login') ? 'Username' : 'Email'} id="email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" id="password" required />
              </div>
              <div className="form-group">
                <input type="submit" className="form-control submit" value="Login" id="submit" />
              </div>
              <p hidden={this.props.match.path === '/admin/login'}>
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
