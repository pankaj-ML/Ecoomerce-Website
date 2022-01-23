import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminPanel from './Components/Admin/AdminPanel';
import AdminSignUp from './Components/Admin/AdminSignUp';
import SellerLogin from './Components/Seller/SellerLogin';
import SellerPanel from './Components/Seller/SellerPanel';
import SellerSignUp from './Components/Seller/SellerSignUp';
import Cart from './Components/Home/Cart';
import Home from './Components/Home/Home';
import BuyerSignUp from './Components/Buyer/BuyerSignUp'
import BuyerLogin from './Components/Buyer/BuyerLogin'
import BuyerPanel from './Components/Buyer/BuyerPanel';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" component={Home}/>
          <Route exact path = "/AdminLogin"  component={AdminLogin}/>
          <Route exact path = "/AdminSignUp" component={AdminSignUp}/>
          <Route exact path = "/AdminPanel"  component={AdminPanel}/>
          <Route exact path = "/SellerLogin" component={SellerLogin}/>
          <Route exact path = "/SellerSignUp"component={SellerSignUp}/>
          <Route exact path = "/SellerPanel" component={SellerPanel}/>
          <Route exact path = "/BuyerLogin"  component={BuyerLogin}/>
          <Route exact path = "/BuyerSignUp" component={BuyerSignUp}/>
          <Route exact path = "/BuyerPanel"  component={BuyerPanel}/>
          <Route exact path = "/Cart" component={Cart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
