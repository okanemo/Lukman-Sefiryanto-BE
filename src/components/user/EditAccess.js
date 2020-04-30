import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editMenu, getMenu } from '../redux/actions/user';

class EditAccess extends Component {
  state = {
    otoritas: null,
    name_menu: '',
    access_menu: '',
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    this.getMenu();
  }
  getMenu() {
    this.props.dispatch(getMenu());
  }
  onSubmit = async (e) => {
    const otoritas = this.state.otoritas;
    const data = this.state;

    e.preventDefault();
    await this.props.dispatch(editMenu(data, otoritas));
    await alert('success changed');
    await this.props.onHide();
  };
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} variant='lg'>
        <Modal.Header>
          <p>Edit access menu</p>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <div className='input-group mb-3'>
              <select
                className='form-control'
                value={this.state.otoritas}
                required
                name='otoritas'
                onChange={this.onChange}
              >
                <option value=''>Choose category</option>
                {this.props.menu.map((menu, index) => (
                  <option key={menu.id} value={menu.otoritas}>
                    {menu.name_menu}
                  </option>
                ))}
              </select>
            </div>
            <Form.Group>
              <Form.Label>Name role</Form.Label>
              <Form.Control
                type='text'
                name='name_menu'
                onChange={this.onChange}
                value={this.state.name_menu}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Id Menu</Form.Label>
              <Form.Control
                type='number'
                name='access_menu'
                onChange={this.onChange}
                value={this.state.access_menu}
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
const mapCategories = (state) => {
  return {
    menu: state.user.menu,
  };
};
export default connect(mapCategories)(EditAccess);
