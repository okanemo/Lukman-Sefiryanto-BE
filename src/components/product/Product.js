import React, { Component } from 'react';
import { Container, Col, Row, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, paginateProducts } from '../redux/actions/product';
import { logout } from '../redux/actions/authpersist';
import ProductItem from './ProductItem';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';
import ProductDelete from './ProductDelete';
import Navbar from '../layout/Navbar';

class Product extends Component {
  state = {
    show: false,
    showEdit: false,
    showDelete: false,
    selectProduct: null,
    selectProductDelete: null,
  };
  componentDidMount() {
    const access = this.props.authpersist.persistLogin.access_menu;
    const { products } = this.props;
    if (!access || access > 2) {
      alert('Unothaurized');
      this.props.history.push('/login');
    }
    this.getProducts();
  }

  getProducts = () => {
    const authorization = this.props.authpersist.persistLogin.id;
    const userId = this.props.authpersist.persistLogin.token;
    this.props.dispatch(getProducts(userId, authorization));
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShowEdit = () => {
    this.setState({
      showEdit: true,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      showEdit: false,
    });
  };

  handleShowDelete = () => {
    this.setState({
      showDelete: true,
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDelete: false,
    });
  };

  onSelectItemProductEdit = (product) => {
    this.setState({
      selectProduct: product,
      showEdit: true,
    });
  };

  onSelectProductDelete = (product) => {
    this.setState({
      selectProductDelete: product,
      showDelete: true,
    });
  };
  onLogout() {
    this.props.dispatch(logout());
    this.props.history.push('/login');
  }
  paginateProducts = (event) => {
    this.props.dispatch(paginateProducts(event.target.id));
  };

  render() {
    console.log('render product');
    const { pagination, products } = this.props;
    const itemProduct = products.products.map((product, index) => (
      <ProductItem
        product={product}
        key={index}
        onSelectItemProductEdit={this.onSelectItemProductEdit}
        onSelectProductDelete={this.onSelectProductDelete}
      />
    ));
    const { user, message } = this.props;
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
      <React.Fragment>
        <Navbar onClick={this.onLogout.bind(this)} />
        <Container style={{ marginTop: '20px' }}>
          <Row style={{ marginBottom: '20px' }}>
            <Col sm={2}>
              <Button variant='primary' size='sm' onClick={this.handleShow}>
                Add Product
              </Button>
            </Col>
          </Row>
          <Table hover size='sm'>
            <thead>
              <tr>
                <th scope='col'>Image</th>
                <th scope='col'>Name</th>
                <th scope='col'>Description</th>
                <th scope='col'>category</th>
                <th scope='col'>Price</th>
                <th scope='col'>Stock</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{itemProduct}</tbody>
          </Table>
          <div className='row'>
            <nav aria-label='Page navigation example'>
              <ul className='pagination perPage'>
                {pagination.map((pagination) => (
                  <li class='page-item' key={pagination}>
                    <a
                      class='page-link'
                      onClick={this.paginateProducts}
                      id={pagination}
                    >
                      {pagination}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ProductAdd show={this.state.show} onHide={this.handleClose} />
          <ProductEdit
            show={this.state.showEdit}
            onHide={this.handleCloseEdit}
            product={this.state.selectProduct}
          />
          <ProductDelete
            show={this.state.showDelete}
            onHide={this.handleCloseDelete}
            product={this.state.selectProductDelete}
          />
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
    pagination: state.products.paginate,
    authpersist: state.authpersist,
    message: state.products.message,
  };
};

export default connect(mapStateToProps)(Product);
