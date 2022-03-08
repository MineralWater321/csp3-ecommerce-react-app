import { Fragment, useEffect, useState, useContext } from 'react';
import CartCard from '../components/CartCard';
import UserContext from '../UserContext';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Cart() {
	// console.log(productData);

	const [orders, setOrders] = useState([]);
	const [total, setTotal] = useState('');
	const { bearer } = useContext(UserContext);

	useEffect(() => {

		fetch('http://localhost:4000/products/cartItems', {
			headers: {
				'Authorization': `Bearer ${bearer}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)

				setOrders(data.map((orders) => {
					return (
						<CartCard key={orders._id} orderProp={orders} />
					)
				}));
			});

		fetch('http://localhost:4000/products/cartPrice', {
			headers: {
				'Authorization': `Bearer ${bearer}`
			}
		})
			.then(res => res.json())
			.then(data => {
				setTotal(data);
			});
	}, [bearer])

	return (
		<Fragment>
			<Table striped bordered hover className='mt-5'>
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
						<th>{total}</th>
					</tr>
				</thead>
			</Table>
		</Fragment>
	)
}