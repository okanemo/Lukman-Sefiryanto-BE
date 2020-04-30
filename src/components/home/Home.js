import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Books from './product';
import Navbar from '../layout/Navbar';
import Pagination from './Pagination';
import { logout } from '../redux/actions/authpersist';
import { connect } from 'react-redux';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      carts: [],
      selectProduct: null,
      category: '',
      product: '',
      page: '',
    };
  }
  componentDidMount() {
    const token = this.props;
    const access = this.props.authpersist.persistLogin.access_menu;
    if (!token && this.props.authpersist.isAuthenticated === false) {
      this.props.history.push('/login');
    }
    if (access > 2) {
      this.props.history.push('/cashier');
    }
  }

  onLogout() {
    this.props.dispatch(logout());
    this.props.history.push('/login');
  }

  render() {
    const { message } = this.props;
    if (message === 404) {
      return (
        <div class='alert alert-danger' role='alert'>
          <div className='container text-center'>
            <h4 class='alert-heading'>Token error!</h4>
            <p>Aww, you token is expired, you can login to fix it.</p>
            <p class='btn btn-primary'>
              <Link className='nav-link' to='/login'>
                <strong>Go to login page</strong>
              </Link>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className>
        <Navbar
          onClick={this.onLogout.bind(this)}
          product={this.state.product}
          page={this.state.page}
        />
        <Books />
        <Pagination
          category={this.state.category}
          product={this.state.product}
          page={this.state.page}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('homedddstate', state.products.message);
  return {
    authpersist: state.authpersist,
    token: state.authpersist.persistLogin.token,
    message: state.products.message,
  };
};

export default connect(mapStateToProps)(Home);
