import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { Container, Card, Button, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ProductView() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const { productId } = useParams();
	const [orderCount, setOrderCount] = useState(1);

    console.log(productId);
	console.log(orderCount);

	function addToCart(e) {
		// e.preventDefault();
		setOrderCount(orderCount + 1);
		const token = localStorage.getItem('token')

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
                        text: 'Go to Cart for Checkout'
                    });
				} else{
					Swal.fire({
                        title: 'Order cannot be created',
                        icon: 'error',
                        text: 'Product is not available for sale'
					});
				}
			}
		})
	}

    useEffect(() => {
		fetch(`http://localhost:4000/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
			
		})
	}, [productId])

	return(
		<Container className="mt-5">
			<Col>
				<Card>
					<Card.Body className="text-center"  onsubmit={(e) => addToCart(e)}>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button variant="primary" onClick={addToCart} block>Add to Cart</Button>
					</Card.Body>
				</Card>
			</Col>
		</Container>
	)
}