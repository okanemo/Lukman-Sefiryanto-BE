import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser, getMenu } from '../redux/actions/user';
class EditUser extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    otoritas_id: '',
    created_at: '',
  };
  componentWillReceiveProps({ user }) {
    this.onSetValue(user);
  }

  onSetValue = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      password: user.password,
      otoritas_id: user.access_menu,
      created_at: user.created_at,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.user.id;
    await this.props.dispatch(updateUser(id, this.state));
    alert('Update sukses');
    await this.props.onHide();
  };
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} variant='lg'>
        <Modal.Header>
          <p>Edit User</p>
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                onChange={this.onChange}
                value={this.state.email}
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
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type='text'
                name='otoritas_id'
                onChange={this.onChange}
                value={this.state.otoritas_id}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Create at</Form.Label>
              <Form.Control
                type='text'
                name='created_at'
                onChange={this.onChange}
                value={this.state.created_at}
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
export default connect()(EditUser);
