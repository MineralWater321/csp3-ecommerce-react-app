import { Fragment, useEffect, useState, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import UserContext from '../UserContext';

export default function Cart(){
	// console.log(productData);
	// console.log(productData[0]);

	const [orders, setOrders] = useState([]);
	const { bearer } = useContext(UserContext);

	useEffect(() => {
		fetch('http://localhost:4000/users/myOrders', {
			headers: {
				'Authorization': `Bearer ${ bearer }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setOrders(data.map(order => {
					return(
						<OrderCard key={order._id} orderProp={order} />
					)
				})
			);
		})
	}, [bearer])
		

	return (
		<Fragment>
			{orders}
		</Fragment>
	)
}