import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login(props) {
        // Allows us to consume the User context object and it's properties to use for user validation
        const { bearer, setBearer } = useContext(UserContext);
		// State hooks to store the values of the input fields
		const [email, setEmail] = useState('');
	    const [password, setPassword] = useState('');
	    // State to determine whether submit button is enabled or not
	    const [isActive, setIsActive] = useState(false);
	    function authenticate(e) {

	        // Prevents page redirection via form submission
	        e.preventDefault();

            // Fetch request to process the backend API
            // Syntax: fetch('url', {options})
            // .then(res => res.json())
            // .then(data => {})
            fetch('http://localhost:4000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // If no user information is found, the "access" property will not be available and will return undefined
                if(typeof data.access !== "undefined"){
                    // The token will be used to retrieve user information across the whole frontend application and storing it in the localStorage to allow ease of access to the user's information
                    setBearer(localStorage.setItem('token', data.access));
                    
                    // retrieveUserDetails(data.access);

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to PieZada!"
                    })
                }
                else{
                    Swal.fire({
                        title: "Authentication failed",
                        icon: "error",
                        text: "Check you login details and try again."
                    })
                }
            })

            // Clear input fields after submission
	        setEmail('');
	        setPassword('');

	        //alert(`${email} has been verified! Welcome back!`);

	    }


		useEffect(() => {

	        // Validation to enable submit button when all fields are populated and both passwords match
	        if(email !== '' && password !== ''){
	            setIsActive(true);
	        }else{
	            setIsActive(false);
	        }

	    }, [email, password]);


    return (
            (bearer !== null) ?
                <Redirect to="/products" />
            :
            <Form onSubmit={(e) => authenticate(e)}>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                { isActive ? 
                    <Button variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="submitBtn" disabled>
                        Submit
                    </Button>
                }
            </Form>
        )  
}
