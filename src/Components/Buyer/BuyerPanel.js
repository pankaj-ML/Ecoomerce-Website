import React, { useState , useEffect } from "react";
import { useHistory } from "react-router-dom";
import BuyerServices from "./BuyerServices";
import "./BuyerSignUp.css";

const BuyerPanel = () => {
    const history = useHistory();
    function back() {
        history.push("/")
    }

    const bid = JSON.parse(localStorage.getItem('userId'));
    const [user ,setUser]=useState({
        bid : localStorage.getItem('userId'),
        name:"",
        mobile:'',
        address:'',
        city:'',
        state:'',
        pinCode:'',
        password:''
    });
   
    useEffect(() => {
        BuyerServices.getBuyer(bid).then(response => {
            setUser(response.data);
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }, []);
    
    const handleinput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
    const onBSubmit=(e)=> {
        e.preventDefault();
        BuyerServices.updateBuyer(bid,user).then(response => {
            alert("Update Sucessfully!");
            console.log(response);
        }).catch(function (error) {
            if (error.response) {
                alert("Enter Password");
            }
        });
    }

    return (
        <div>
            <div>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand " style={{ marginLeft: '10px' }}>My Account</a>
                    <div className="form-inline">
                        <button type="button" className="btn btn-outline-warning my-2 my-sm-0 " style={{ marginRight: '17px' }} onClick={() => back()}><strong>Home</strong></button>
                    </div>
                </nav>
            </div>
            <div className="container-sm">
            <form>
                        <h2 className="text-center w"><strong>Buyer Update</strong></h2>
                        <div className="form-group">
                            <input type="text"  name ="name" value={user.name} onChange={handleinput}className="form-control inBuyer w" placeholder="Name"/>
                        </div>
                        
                        
                        <div className="form-group">
                            <input type="text" name ="mobile" value={user.mobile}   onChange={handleinput} className="form-control inBuyer w" placeholder="mobile Number"/>
                        </div>
                        
                        <div className="form-group">
                            <textarea type="text" name ="address" value={user.address}  onChange={handleinput} className="form-control inBuyer w" placeholder="Address"/>   
                        </div>
                        
                        <div className="form-group">
                            <input type="text" name ="city" value={user.city}  onChange={handleinput} className="form-control inBuyer w" placeholder="City"
                              />
                          
                        </div>
                        
                        <div className="form-group">
                            <input type="text" name= "state" value={user.state}  onChange={handleinput} className="form-control inBuyer w" placeholder="State"
                             />
        
                        </div>
                        
                        <div className="form-group">
                            <input type="text" name= "pinCode" value={user.pinCode}  onChange={handleinput} className="form-control inBuyer w" placeholder="pincode"
                               />
                        </div>

                        
                        <div className="form-group">
                            <input type="password" name ="password"  onChange={handleinput} className="form-control inBuyer w" placeholder="Enter password"
                               />
                        </div>
                        
                        
                        <div className="d-grid gap-2 col-20 mx-auto">
                            <button type="submit" onClick={onBSubmit} className="btn btn-primary w">Update</button>
                        </div>
            
                    </form>
            </div>
        </div>
    )
}
export default BuyerPanel;