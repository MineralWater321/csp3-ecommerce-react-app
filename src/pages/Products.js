import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products(){
	// console.log(productData);
	// console.log(productData[0]);

	const [products, setProducts] = useState([]);
	
	useEffect(() => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setProducts(data.map(product => {
					return(
						<ProductCard key={product._id} productProp={product} />
					)
				})
			);
		})
	}, [])

	return (
		<Fragment>
			{products}
		</Fragment>
	)
}