import React, { Component } from 'react';
import { Container, Col, Row, Button, Table } from 'react-bootstrap';
import UserItem from './UserItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../redux/actions/user';
import UserAdd from './UserAdd';
import UserDelete from './UserDelete';
import UserEdit from './EditUser';
import Navbar from '../layout/Navbar';
import EditAccess from '../user/EditAccess';
import { logout } from '../redux/actions/authpersist';
class Book extends Component {
  state = {
    show: false,
    showEdit: false,
    showDelete: false,
    selectUser: null,
    selectUserDelete: null,
    editAccess: false,
  };
  componentDidMount() {
    const access = this.props.authpersist.persistLogin.access_menu;
    if (!access || access > 1) {
      alert('Unothorized please login to access menu');
      this.props.history.push('/login');
    }
    this.getAllUser();
  }

  getAllUser = async () => {
    const authorization = this.props.authpersist.persistLogin.id;
    const userId = this.props.authpersist.persistLogin.token;
    await this.props.dispatch(getUser(userId, authorization));
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  showEdit = () => {
    this.setState({
      showEdit: true,
    });
  };
  handleCloseEdit = () => {
    this.setState({
      showEdit: false,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
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
  handleShowMenu = () => {
    this.setState({
      editAccess: true,
    });
  };
  handleCloseMenu = () => {
    this.setState({
      editAccess: false,
    });
  };
  onSelectItemUserEdit = (user) => {
    this.setState({
      selectUser: user,
      showEdit: true,
    });
  };

  onSelectUserDelete = (user) => {
    this.setState({
      selectUserDelete: user,
      showDelete: true,
    });
  };

  onLogout() {
    this.props.dispatch(logout());
    this.props.history.push('/login');
  }
  render() {
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
    const itemUser = user.user.map((user, index) => (
      <UserItem
        user={user}
        key={index}
        onSelectItemUserEdit={this.onSelectItemUserEdit}
        onSelectUserDelete={this.onSelectUserDelete}
      />
    ));

    return (
      <React.Fragment>
        <Navbar onClick={this.onLogout.bind(this)} />
        <Container style={{ marginTop: '20px' }}>
          <Row style={{ marginBottom: '20px' }}>
            <Col sm={8}>
              <h5>Manage users</h5>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col sm={2}>
              <Button size='sm' onClick={this.handleShowMenu}>
                Edit Access Menu
              </Button>
            </Col>
            <Col>
              <Button size='sm' onClick={this.handleShow}>
                Add User
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
                <th scope='col'>Access id</th>
                <th scope='col'>Created_at</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{itemUser}</tbody>
          </Table>
          <EditAccess
            show={this.state.editAccess}
            onHide={this.handleCloseMenu}
          />
          <UserAdd show={this.state.show} onHide={this.handleClose} />
          <UserEdit
            show={this.state.showEdit}
            onHide={this.handleCloseEdit}
            user={this.state.selectUser}
          />
          <UserDelete
            show={this.state.showDelete}
            onHide={this.handleCloseDelete}
            user={this.state.selectUserDelete}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    authpersist: state.authpersist,
    message: state.products.message,
  };
};

export default connect(mapStateToProps)(Book);
