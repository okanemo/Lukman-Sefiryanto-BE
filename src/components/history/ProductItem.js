import React, { Fragment } from 'react';
const ProductItem = ({ order }) => {
    // console.log('order', order)

    return (
        <Fragment>
            <tr>
                <td>{order.id_order}</td>
                <td>{order.name}</td>
                <td>{order.id_user}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.total}</td>
                <td>{order.created_at}</td>

            </tr>
        </Fragment>
    )
}

export default ProductItem;