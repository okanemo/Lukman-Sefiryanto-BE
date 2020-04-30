import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap'
const ProductItem = ({ product, onSelectItemProductEdit, onSelectProductDelete }) => {
    const onClickEdit = (e) => {
        e.preventDefault();
        onSelectItemProductEdit(product)
    }
    const onClickDelete = (e) => {
        e.preventDefault();
        onSelectProductDelete(product);
    }

    return (
        <Fragment>
            <tr>
                <td><img src={product.image} className="imageCart" alt="..." /></td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category_name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>

                <td><Button variant="warning" size="sm" onClick={onClickEdit}>Edit</Button> - <Button variant="danger" size="sm" onClick={onClickDelete}>Delete</Button></td>
            </tr>
        </Fragment>
    )
}

export default ProductItem;