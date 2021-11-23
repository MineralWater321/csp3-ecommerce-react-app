import { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout(){
	const { unsetUser, setBearer }= useContext(UserContext);

	unsetUser();

	useEffect(() => {
		// Set the user state back to it's original value
		setBearer(localStorage.getItem('token'));
	})

	// Redirect back to login
	return(
		<Redirect to="/login" />
	)
}