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
	// const [orderCount, setOrderCount] = useState(0);
	function addToCart(e) {
		e.preventDefault();
		console.log(productId)
		const token = localStorage.getItem('token')
		if (token === null) {
			Swal.fire({
				title: 'Login first before placing order.',
				icon: 'error',
				text: 'Go to Login Page'
			});
			<Redirect to="/login" />
			return
		}
		fetch(`http://localhost:4000/products/${productId}/addToCart`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(data => {
				console.log(data);

				if (data !== 'noAdmin') {
					if (data !== 'notOnSale') {
						Swal.fire({
							title: 'Order created',
							icon: 'success',
							text: 'Go to Checkout'
						});
					}
				}
			})
	}


	useEffect(() => {
		fetch(`http://localhost:4000/products/${productId}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);

				setName(data.name);
				setDescription(data.description);
				setPrice(data.price);

			})
	}, [productId])

	return (
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