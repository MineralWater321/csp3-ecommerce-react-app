import { Fragment, useEffect, useState, useContext } from 'react';
import OrderCard from '../components/OrderCard';
import UserContext from '../UserContext';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
			console.log(data)
			setOrders(data.map(order => {
					return(
						<OrderCard key={order._id} orderProp={order} />					
					)		
				})
			);
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
				<tfoot>
					<td colSpan="3">
					<Link className="btn btn-primary" to={`/checkout`}>Checkout Items</Link> 
					</td>
					<td>asdasd</td>
				</tfoot>
			</Table>
		</Fragment>
	)
}