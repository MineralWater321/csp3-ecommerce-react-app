// import { useState } from 'react';
// Proptypes - used to validate props
import PropTypes from 'prop-types';
// import { Card, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

export default function CartCard({ orderProp }) {
    console.log(orderProp);
    const { productName, amount, totalPrice } = orderProp;
    const itemPrice = totalPrice / amount;

    return (
        <tr>
            <td>{productName}</td>
            <td>{itemPrice}</td>
            <td>{amount}</td>
            <td>{totalPrice}</td>
        </tr>
    )
}

// Checks the validity of the PropTypes
CartCard.propTypes = {
    // "shape" method is used to check if a prop object conforms to a specific shape
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}