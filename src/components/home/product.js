import React, { Component } from 'react';
import CardProduct from './CardProduct';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { getProducts, detailProducts } from '../redux/actions/product';
import {
  addQty,
  reduceQty,
  deleteCart,
  postOrder,
} from '../redux/actions/cart';
import { Row, Col, Button } from 'react-bootstrap';
import logo from '../upload/viewcart.png';

class Books extends Component {
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
  actSelectProduct = (products) => {
    this.setState({
      selectProduct: products,
    });
  };

  state = {
    show: false,
  };
  onShow = (event) => {
    this.setState({
      show: true,
    });
  };
  onHandleClose = () => {
    this.setState({
      show: false,
    });
  };
  getProducts() {
    const authorization = this.props.authpersist.persistLogin.id;
    const userId = this.props.authpersist.persistLogin.token;
    this.props.dispatch(getProducts(userId, authorization));
  }

  async componentDidMount() {
    await this.getProducts();
  }
  addQuantity = (id) => {
    this.props.dispatch(addQty(id));
  };

  reduceQuantity = (id) => {
    this.props.dispatch(reduceQty(id));
  };
  onDeleteCart = (id) => {
    this.props.dispatch(deleteCart(id));
  };
  paginateProducts = (event) => {
    this.setState({
      page: event.target.id,
    });
    this.props.dispatch(
      detailProducts(this.state.category, this.state.product, event.target.id)
    );
  };
  onSubmit = async (e) => {
    e.preventDefault();
    let product = [];
    this.props.carts.map((cart) => {
      product.push({
        id_product: cart.id,
        quantity: cart.quantity,
      });
    });
    const data = {
      id_user: this.props.authpersist.persistLogin.name,
      total: this.props.total,
      product: product,
    };
    await this.props.dispatch(postOrder(data));
    alert('success');
  };

  render() {
    const { products, carts, total } = this.props;

    const dataProduct = products.map((item, index) => {
      return (
        <CardProduct
          product={item}
          key={index}
          selectProductItem={this.actSelectProduct}
        />
      );
    });
    if (this.props.carts < 1) {
      return (
        <React.Fragment>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>{dataProduct}</div>
            </div>
            <div className='col-4'>
              <div className='cardCart'>
                <p>.</p>
                <img
                  style={{
                    width: 330,
                    height: 400,
                    borderRadius: 50,
                    marginLeft: -40,
                  }}
                  src={logo}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>{dataProduct}</div>
            </div>
            <div className='col-4'>
              <div className='cardCart'>
                <p>.</p>
                {carts.map((cart) => (
                  <Row
                    style={{
                      marginBottom: '10px',
                      border: '1px solid rgba(0,0,0,.1)',
                      paddingTop: '20px',
                      marginLeft: '0px',
                      marginRight: '0px',
                      paddingBottom: '10px',
                    }}
                  >
                    <Col xs={6} md={4} border='info'>
                      <img src={cart.image} alt='' width={80} height={80} />
                    </Col>
                    <Col xs={6} md={6}>
                      <p>{cart.name}</p>
                      <Row style={{ marginTop: '10px' }}>
                        <Col sm={2}>
                          <Button
                            size='sm'
                            variant='outline-info'
                            onClick={() => this.reduceQuantity(cart.id)}
                          >
                            -
                          </Button>
                        </Col>
                        <Col sm={2}>{cart.quantity}</Col>
                        <Col sm={2}>
                          <Button
                            size='sm'
                            variant='outline-info'
                            onClick={() => this.addQuantity(cart.id)}
                          >
                            +
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Row xs={6} md={2}>
                      <Col>
                        <p> Rp. {cart.price}</p>
                      </Col>
                      <Col>
                        <Button
                          className='btnCart'
                          size='sm'
                          onClick={() => this.onDeleteCart(cart.id)}
                          variant='danger'
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Row>
                ))}
                <Row style={{ fontWeight: 'bold' }}>
                  <Col sm={6} style={{ fontSize: '25px' }}>
                    Total:{' '}
                  </Col>
                  <Col sm={6} style={{ fontSize: '25px' }}>
                    Rp. {total}
                  </Col>
                </Row>
                <Row
                  className='justify-content-center'
                  style={{ marginBottom: '10px' }}
                >
                  <Col sm={12}>
                    <Button
                      variant='primary'
                      onClick={this.onSubmit}
                      style={{ marginLeft: '100px' }}
                    >
                      ORDER
                    </Button>{' '}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  // console.log('disini messgae', state.products.message);
  return {
    user: state.user,
    products: state.products.products,
    carts: state.carts.carts,
    total: state.carts.total,
    deleteCart: state.carts.deleteCart,
    pagination: state.products.paginate,
    authpersist: state.authpersist,
    message: state.products.message,
  };
};
export default connect(mapStateToProps)(Books);
