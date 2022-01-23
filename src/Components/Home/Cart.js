import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import CartServices from "./CartServices";
import "./ListProducts.css";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState();
    useEffect(() => {
        const buyer = JSON.parse(localStorage.getItem('userdata'));
        CartServices.cart(buyer.email).then(res => {
            setCart(res.data.list)
            setSum(res.data.sum)
            localStorage.setItem('cart', JSON.stringify(res.data));
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }, []);

    const history = useHistory();
    function back() {
        history.push("/")
    }

    function deleteCart(data) {
        const buyer = JSON.parse(localStorage.getItem('userdata'));
        CartServices.deleteCart(buyer.id, data.id).then(res => {
            alert(res.data)
            window.location.reload(false);
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }
    function checkout() {
        var l = document.getElementById("load");
        l.innerHTML = "<img src=\"https://i.gifer.com/VAyR.gif\" width=\"100px\" height=\"100px\">";
        const buyer = JSON.parse(localStorage.getItem('userdata'));
        CartServices.checkout(buyer.id).then(res => {
            alert(res.data)
            l.innerHTML = "";
            window.location.reload(false);
        }).catch(function (error) {
            if (error.response) {
                l.innerHTML = "";
                alert(error.response.data.message);
            }
        });
    }


    return (
        <div>
            <div>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand" style={{ marginLeft: '10px', marginBottom:'-25px' }}>My CART
                    <p className="process" id="load"></p></a>
                    <div className="form-inline">
                        <button type="button" className="btn btn-outline-info my-2 my-sm-0 " style={{ marginRight: '17px' }} onClick={() => checkout()}><strong>Checkout</strong></button>
                        <button type="button" className="btn btn-outline-warning my-2 my-sm-0 " style={{ marginRight: '17px' }} onClick={() => back()}><strong>Home</strong></button>
                    </div>
                </nav>
            </div>

            <div>
                <div>
                    <div className="row">

                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-lg">
                            <Table striped bordered hover variant="dark" style={{ color: 'yellow' }}>
                                <thead>
                                    <tr>
                                        <th> ID</th>
                                        <th>Image</th>
                                        <th> Name</th>
                                        <th> Description</th>
                                        <th> Price</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cart.map(
                                            (data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td> {data.id}</td>
                                                        <td> <img src={data.images} /></td>
                                                        <td> {data.name}</td>
                                                        <td> {data.description} </td>
                                                        <td> {data.price} </td>
                                                        <td>
                                                            <button style={{ marginLeft: "5px" }} onClick={() => deleteCart(data)} className="btn-danger">Delete </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th > Total Amount </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th >Rs:{sum}</th>
                                        <th></th>
                                    </tr>

                                </tfoot>
                            </Table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Cart;