import { Fragment, useEffect, useState, useContext } from 'react';
import CartCard from '../components/CartCard';
import UserContext from '../UserContext';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Cart(){
	// console.log(productData);
	// console.log(productData[0]);

	const [orders, setOrders] = useState([]);
	const { bearer } = useContext(UserContext);
	
	useEffect(() => {

		fetch('https://polar-wildwood-60933.herokuapp.com/users/myOrders', {
			headers: {
				'Authorization': `Bearer ${ bearer }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setOrders(data.map((orders) => (
				<CartCard key={orders._id} orderProp={orders} />		
			)));
		});
	}, [bearer])
	
	

	return (
		<Fragment>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Item Price</th>						
						<th>Qty</th>
						<th>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{orders}
				</tbody>
				<thead>
					<tr>
						<th colSpan="3">
						<Link className="btn btn-primary" to={`/checkout`}>Checkout Items</Link> 
						</th>
						<th>asdasd</th>
					</tr>
				</thead>
			</Table>
		</Fragment>
	)
}