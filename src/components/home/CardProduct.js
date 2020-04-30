import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { addCart } from '../redux/actions/cart'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class CardProduct extends Component {

    selectProduct = (product) => {
        product.quantity = 1
        this.props.dispatch(addCart(product))
    }

    render() {
        const { product } = this.props
        return (
            < React.Fragment >
                <div className="col-md-4 mt-2">
                    <Card style={{ width: '18rem' }} className="mt-1">
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Header>{product.name}
                                <Card.Text>
                                    <p className="badge badge-light"> Price Rp. {product.price}</p> || <p className="badge badge-light"> Stock {product.stock}</p>
                                </Card.Text></Card.Header>
                            <hr />
                            <Button className="cart mt-2" style={{ marginLeft: "90px" }} variant="outline-primary" onClick={() => (this.selectProduct(product))}><i className="fas fa-cart-plus" style={{ width: "40px" }}></i></Button>
                        </Card.Body>
                    </Card>
                </div>
            </React.Fragment >
        )
    }
}
export default withRouter(connect()(CardProduct))