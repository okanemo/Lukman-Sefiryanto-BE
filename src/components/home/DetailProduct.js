import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addQty, reduceQty } from '../redux/actions/cart'
import product from '../redux/reducers/product'
class DetailProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    addQuantity = (id) => {

        this.props.dispatch(addQty(id))
    }

    reduceQuantity = (id) => {

        this.props.dispatch(reduceQty(id))
    }
    componentDidMount() {

    }

    render() {
        const { carts, total } = this.props
        const listCart = carts.map((product, index) => {

        })
        return (
            <React.Fragment>
                <div>
                    <div>

                        <div class="cartCard">
                            <img src={product.image} className="imageCart" alt="..." /> <button size="sm" variant="outline-info" onClick>Remove</button>
                            <input onChange={this.onChange} type="text" className="form-control" name="id_product" placeholder="Enter name" value={product.id} hidden readOnly />
                            <p>{product.name}</p>
                            <button size="sm" variant="outline-info" onClick={() => (this.reduceQuantity(product.id))}>-</button>
                            |{product.quantity}|
                                <button size="sm" variant="outline-info" onClick={() => (this.addQuantity(product.id))}>+</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(connect()(DetailProduct));