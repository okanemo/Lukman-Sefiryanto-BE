import React, { Component } from 'react';
import { Container, Row, Table } from 'react-bootstrap';

import { connect } from 'react-redux';
import { getOrder } from '../redux/actions/order';
import ProductItem from './ProductItem';
import Navbar from '../layout/Navbar'

class History extends Component {

    componentDidMount() {
        this.getOrder()
    }

    getOrder = () => {
        this.props.dispatch(getOrder())
    }
    onLogout() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('otoritas_id');
        this.props.history.push('/login');
    }
    render() {
        console.log('render product')
        const { order } = this.props;

        const itemProduct = order.order.map((order, index) => <ProductItem order={order} key={index} onSelectItemProductEdit={this.onSelectItemProductEdit} onSelectProductDelete={this.onSelectProductDelete} />);

        return (
            <React.Fragment>
                <Navbar onClick={this.onLogout.bind(this)} />
                <Container style={{ marginTop: "20px" }}>
                    <Row style={{ marginBottom: "20px" }}>
                    </Row>
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">User</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemProduct}
                        </tbody>
                    </Table>
                </Container>
            </React.Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        order: state.order,

    }
}

export default connect(mapStateToProps)(History);