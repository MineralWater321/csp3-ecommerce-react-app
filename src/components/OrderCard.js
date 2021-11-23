// import { useState } from 'react';
// Proptypes - used to validate props
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

export default function OrderCard({orderProp}) {
	console.log(orderProp);
	const { productName, totalAmount, totalPrice} = orderProp;

	// State hook - used to keep track of information related to individual components
	// Syntax: const [getter, setter] = useState(initialGetterValue);
	

    return (
        <Card className="mb-3">
            <Card.Body >
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>Number of Orders:</Card.Subtitle>
                <Card.Text>{totalAmount}</Card.Text>
                <Card.Subtitle>Amount to Pay:</Card.Subtitle>
                <Card.Text>PhP {totalPrice}</Card.Text>
                {/* <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>  */}
            </Card.Body>
        </Card>
    )
}

// Checks the validity of the PropTypes
OrderCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}