import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Row, } from 'react-bootstrap';

export default function Products(){
	// console.log(productData);
	// console.log(productData[0]);

	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([])

	let productData = [];
	
	useEffect(() => {
		fetch('https://polar-wildwood-60933.herokuapp.com/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProducts(data.map(product => {
				return(
					<ProductCard key={product._id} products={product} />
				)
			})
		);
	})
}, [])

return (
	<Fragment>
		<Row className="ml-2 mt-2">
			{products}
		</Row>
	</Fragment>
)
}