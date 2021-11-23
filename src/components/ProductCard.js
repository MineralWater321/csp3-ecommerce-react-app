// import { useState } from 'react';
// Proptypes - used to validate props
import PropTypes from 'prop-types'
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ProductCard(props) {
	
	const { products } = props;
    
	// State hook - used to keep track of information related to individual components
	// Syntax: const [getter, setter] = useState(initialGetterValue);
	
    return (
        <Col md={4}>
            <Card className="mb-3">
                <Card.Body >
                    <Card.Title>{products.name}</Card.Title>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{products.description}</Card.Text>
                    <Card.Subtitle>Price:</Card.Subtitle>
                    <Card.Text>PhP {products.price}</Card.Text>
                    <Link className="btn btn-primary" to={`/products/${products._id}`}>Details</Link>
                    {/* <Button className="ml-1" onClick={addCart}>Add To Cart</Button> */}
                </Card.Body>
            </Card>
        </Col>
    )
}

// Checks the validity of the PropTypes
ProductCard.propTypes = {
	// "shape" method is used to check if a prop object conforms to a specific shape
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}