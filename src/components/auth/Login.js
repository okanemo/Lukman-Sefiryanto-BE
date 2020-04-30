import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logout } from '../redux/actions/authpersist';
import image from '../../images/logomygadget.png';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  onLogout() {
    this.props.dispatch(logout());
  }
  componentDidMount() {
    // this.onLogout();
    const auth = this.props.auth;
    console.log('ini auth', auth);
    if (auth < 1) {
      this.props.history.push('/login');
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.dispatch(login(this.state));
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='container' style={{ marginTop: '21%' }}>
        <div className='row justify-content-md-center'>
          <div className='col-md-8 my-4'>
            <form onSubmit={this.onSubmit} className='box'>
              <div className='form-group'>
                <img
                  src={image}
                  style={{ width: '70%', height: '70%', borderRadius: '10%' }}
                />
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter email'
                  name='email'
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Enter password'
                  name='password'
                  onChange={this.onChange}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('ini auth');
  return {
    authpersist: state.authpersist,
  };
};
export default connect(mapStateToProps)(Login);
