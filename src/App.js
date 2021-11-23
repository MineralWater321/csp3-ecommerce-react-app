import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Admin from './pages/Admin'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import './App.css';
import { UserProvider } from './UserContext';

function App() {

  const [bearer, setBearer] = useState(localStorage.getItem('token'));
  
  const unsetUser = () => {
    localStorage.clear();
  }
  

  useEffect(() => {
    console.log(bearer);
    console.log(localStorage);
  }, [bearer])

  return (
    <UserProvider value={{bearer, setBearer, unsetUser}}>        
      <Router>
        <AppNavbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:productId" component={ProductView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={OrderHistory} />
            <Route exact path="/admin" component={Admin} />
            <Route component={Error} />
          </Switch>
          </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
