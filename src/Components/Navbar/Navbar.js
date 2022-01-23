import React, { Component } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, NavDropdown, Nav} from 'react-bootstrap';
import { AccountBox } from "@material-ui/icons";
import { FaShoppingCart } from 'react-icons/fa';



export default class Nav1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      buyerdetail: {},
    }
    this.logOut = this.logOut.bind(this);
  }
  //GET LOGGED IN USER
  componentDidMount() {
    if (localStorage.getItem('userdata')) {
      const buyerdetail = JSON.parse(localStorage.getItem('userdata'));
      if (buyerdetail) {
        console.log(buyerdetail);
        this.setState({
          "buyerdetail": buyerdetail,
          "isLoggedIn": true,
        });
      }
    }
  }

  //LOGOUT
  logOut() 
  {
    localStorage.removeItem('userdata');
    this.setState({ "isLoggedIn": !this.state.isLoggedIn });
    //window.location.reload(false);
  }
  
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home" style={{ color: 'white', marginLeft: '20px',fontSize: '32px'}}>Ecommerce</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Nav>
                <NavDropdown title="Register" className='navlinkr' id="basic-nav-dropdown">
                  <NavDropdown.Item href="BuyerSignUp">Buyer signup</NavDropdown.Item>
                  <NavDropdown.Item href="SellerSignUP">Seller signup</NavDropdown.Item>

                </NavDropdown>
                <NavDropdown title="Login" className='navlink1' id="basic-nav-dropdown">
                  <NavDropdown.Item href="/BuyerLogin">Buyer</NavDropdown.Item>
                  <NavDropdown.Item href="/SellerLogin">Seller</NavDropdown.Item>
                  <NavDropdown.Item href="/AdminLogin">Admin</NavDropdown.Item>

                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    }
    else {
      return (
        <div>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home" style={{ color: 'white', marginLeft: '20px' ,fontSize: '32px'}}>Ecommerce</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <p className="nav_hi" style={{ color: 'white', fontSize: '18px',marginLeft: '950px', marginRight:'auto', marginTop:'10px'}}>Hi,{(this.state.buyerdetail.email)}</p>
                <NavLink style={{ color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px', marginLeft: '15px' }} to="/Cart"><FaShoppingCart /></NavLink>
                <NavLink style={{ color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px', marginLeft: '15px' }} to="/BuyerPanel"><AccountBox /></NavLink>
                <NavLink style={{ color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px', marginLeft: '10px', marginRight: '20px' }} to="/" onClick={this.logOut}>Logout</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    }
  }
}
