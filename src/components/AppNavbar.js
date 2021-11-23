import { Fragment, useContext } from 'react';
// Import necessary components from react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

// AppNavbar component
export default function AppNavbar(){
	// State to store the user information stored in the login page
	// const [user, setUser] = useState(localStorage.getItem("email"));
	// console.log(user);
	const { bearer } = useContext(UserContext);
	console.log({bearer});
	
	return(
		<Navbar bg="dark" variant="dark">
		    <Navbar.Brand as={NavLink} to="/" exact>PieZada</Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="ml-auto">
			      <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
			      <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
			      {(bearer === null) ? 
						<Fragment>
							<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
							<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
						</Fragment>
						
                        :
						<Fragment>
                        	<Nav.Link as={NavLink} to="/cart" exact>Cart</Nav.Link>
							<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
						</Fragment>
					}
			    </Nav>
		    </Navbar.Collapse>
	  	</Navbar>
	)
}