import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateProduct } from '../redux/actions/product';

class ProductEdit extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    category_id: '',
    price: '',
    stock: '',
  };

  componentWillReceiveProps({ product }) {
    this.onSetValue(product);
  }

  onSetValue = (product) => {
    this.setState({
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
    });
  };
  onChangeImage = (event) => {
    // console.log(event.target.files[0])
    this.setState({
      image: event.target.files[0],
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.product.id;
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('image', this.state.image);
    data.append('category_id', this.state.category_id);
    data.append('price', this.state.price);
    data.append('stock', this.state.stock);
    if (this.state.image === '') {
      data.delete('image');
      await this.props.dispatch(updateProduct(id, data));
      alert('success update');
      await this.props.onHide();
    } else {
      await this.props.dispatch(updateProduct(id, data));
      alert('fail update');
      await this.props.onHide();
    }
  };

  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} variant='lg'>
        <Modal.Header>
          <p>Edit Book</p>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={this.onChange}
                value={this.state.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                name='description'
                onChange={this.onChange}
                value={this.state.description}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                name='image'
                onChange={this.onChangeImage}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                name='category_id'
                onChange={this.onChange}
              >
                <option value={1}>Smartphone</option>
                <option value={2}>Pc</option>
                <option value={3}>Smartwatch</option>
                <option value={4}>Camera</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                name='price'
                onChange={this.onChange}
                value={this.state.price}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='text'
                name='stock'
                onChange={this.onChange}
                value={this.state.stock}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant='secondary' size='sm' onClick={onHide}>
                Close
              </Button>
              <Button variant='primary' size='sm' type='submit'>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect()(ProductEdit);
