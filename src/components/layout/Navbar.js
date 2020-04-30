import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { detailProducts } from '../redux/actions/product';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      product: '',
      page: '',
    };
  }
  onCategory = (event) => {
    this.setState({
      category: event.target.value,
    });
    this.props.history.push(
      `?category=${event.target.value}&name=${this.state.product}&pages${this.state.page}`
    );
    this.props.dispatch(
      detailProducts(event.target.value, this.state.product, this.state.page)
    );
  };
  onProduct = (event) => {
    this.setState({
      product: event.target.value,
    });
    this.props.history.push(
      `?category=${this.state.category}&name=${event.target.value}&pages${this.state.page}`
    );
    this.props.dispatch(
      detailProducts(this.state.category, event.target.value, this.state.page)
    );
  };

  render() {
    const authpersist = this.props.authpersist.persistLogin.access_menu;
    if (authpersist === 1) {
      return (
        <nav className='navbar navbar-expand-lg'>
          <div className='container'>
            <Link className='navbar-brand bg-white'>My^gadget</Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarNav'
              aria-controls='navbarNav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item active'>
                  <Link className='nav-link' to='/'>
                    <span className='fa fa-fw fa-home'></span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/product'>
                    <i class='fa fa-fw fa-cogs'></i>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/history'>
                    <i className='fas fa-history'></i>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/charts'>
                    <i class='fas fa-chart-line'></i>
                  </Link>
                </li>
                {/* user control */}
                <li className='nav-item'>
                  <Link className='nav-link' to='/user'>
                    <i className='fas fa-user-cog'></i>
                  </Link>
                </li>
                {/* user end */}
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='#'
                    onClick={this.props.onClick}
                  >
                    <i className='fas fa-sign-out-alt'></i>
                  </Link>
                </li>
                <li className='nav-item'>
                  <select
                    onChange={this.onCategory}
                    as='select'
                    className='custom-select badge badge-light'
                  >
                    <option value=''>Filter...</option>
                    <option value='smartphone'>Smartphone </option>
                    <option value='pc'>PC </option>
                    <option value='camera'>Camera </option>
                  </select>
                </li>
                <li className='nav-item'>
                  <form onSubmit={this.onProduct}>
                    <input
                      class='form-control mr-sm-2'
                      type='search'
                      name='search'
                      onChange={this.onProduct}
                      placeholder='Search'
                    />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    return (
      <nav className='navbar navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand bg-white'>My^gadget</Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  <span className='fa fa-fw fa-home'></span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/product'>
                  <i class='fa fa-fw fa-cogs'></i>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/history'>
                  <i className='fas fa-history'></i>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/charts'>
                  <i class='fas fa-chart-line'></i>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='#' onClick={this.props.onClick}>
                  <i className='fas fa-sign-out-alt'></i>
                </Link>
              </li>
              <li className='nav-item'>
                <select
                  onChange={this.onCategory}
                  as='select'
                  className='custom-select badge badge-light'
                >
                  <option value=''>Filter...</option>
                  <option value='smartphone'>Smartphone </option>
                  <option value='pc'>PC </option>
                  <option value='camera'>Camera </option>
                </select>
              </li>
              <li className='nav-item'>
                <form onSubmit={this.onProduct}>
                  <input
                    class='form-control mr-sm-2'
                    type='search'
                    name='search'
                    onChange={this.onProduct}
                    placeholder='Search'
                  />
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authpersist: state.authpersist,
  };
};
export default withRouter(connect(mapStateToProps)(Navbar));
