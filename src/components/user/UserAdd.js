import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { postUser } from '../redux/actions/user';

class UserAdd extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    otoritas_id: '',
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.dispatch(postUser(this.state));
    alert('success added');
    await this.props.onHide();
  };
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} variant='lg'>
        <Modal.Header>
          <p>Add Book</p>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                name='category_id'
                onChange={this.onChange}
              >
                <option value={1}>Admin</option>
                <option value={2}>Cashier</option>
              </Form.Control>
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

export default connect()(UserAdd);
