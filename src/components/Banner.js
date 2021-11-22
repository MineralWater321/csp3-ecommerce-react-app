//import Button from 'react-bootstrap/Button';
// Bootstrap grid system components
//import Row from 'react-bootstrap/Row';
//import Column from 'react-bootstrap/Column';
//import { Row } from 'react-bootstrap';
//import { Column } from 'react-bootstrap';

import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}){
	console.log(data)
	const {title, content, destination, label} = data;
	
		return (
			<Row>
				<Col className="p-5">
					<h1>{title}</h1>
					<p>{content}</p>
					{/*<Link to={destination}>{label}</Link>*/}
					<Link to={destination}>
						<Button variant="primary" to={destination}>{label}</Button>
					</Link>
				</Col>
			</Row>
		)
}