import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { Row, Card, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function ProductView() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const { productId } = useParams();
	const [orderCount, setOrderCount] = useState(0);

    console.log(productId);

	function addToCart(e) {
		e.preventDefault();
		
		const token = localStorage.getItem('token')
		console.log(token);
		if(token === null){
			Swal.fire({
				title: 'Login first before placing order.',
				icon: 'error',
				text: 'Go to Login Page'
			});
			<Redirect to="/login" />
			return
		}
		setOrderCount(orderCount + 1);
		fetch('http://localhost:4000/users/addToCart', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				productId: productId,
				quantity: orderCount
			})
		})
		.then(res => res.json())
        .then(data => {
            console.log(data);

			
			if(data !== 'noAdmin'){
				if(data !== 'notOnSale'){
					Swal.fire({
                        title: 'Order created',
                        icon: 'success',
                        text: 'Product is not available for sale'
					});
				}
			}
		})
	}


    useEffect(() => {
		fetch(`https://polar-wildwood-60933.herokuapp.com/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
			
		})
	}, [productId])

	return(
		<Row className="mt-5 mb-3">
			<Col md={4}>
			</Col>
			<Col md={4}>
				<Card>
					<Card.Body className="text-center">
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button variant="primary" onClick={addToCart}>Add to Cart</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}