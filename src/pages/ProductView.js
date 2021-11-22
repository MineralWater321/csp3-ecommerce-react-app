import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { Container, Card, Button, Col } from 'react-bootstrap';

export default function ProductView() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const { productId } = useParams();

    console.log(productId);

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
					<Card.Body className="text-center">
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button variant="primary" block>Add to Cart</Button>
					</Card.Body>
				</Card>
			</Col>
		</Container>
	)
}