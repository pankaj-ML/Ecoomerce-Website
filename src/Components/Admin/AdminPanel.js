import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AdminServices from "./AdminServices";
import { Table } from "react-bootstrap";

const AdminPanel = () => {
    const [sellers , setSeller] = useState([]);
    useEffect(() => {
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = {
            jwt: Token,
            id: ID
        }
        AdminServices.getSeller(headers).then(Response => {
        setSeller(Response.data);
        console.log(sellers)
        }).catch(function (error) {
            if (error.Response) {
                alert("Error ");
            }
        });
        }, []);

    const history = useHistory();
    function logout() {
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = {
            jwt: Token,
            id: ID
        }
        AdminServices.logoutAdmin(headers).then(Response => {
            alert('Logout successfully');
            localStorage.clear();
            history.push("/")
            return false;
        }).catch(function (error) {
            if (error.Response) {
                alert("Logout Error");
            }
        });
    }
    const status = {status: "Active"}
    const inactive ={status: "Inative"}

    function updateSeller(data ,status){
        //alert(data.id)
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = {
            jwt: Token,
            id: ID
        }
        AdminServices.updateStatus(headers,data.id,status).then(response =>{ 
          alert(status.status+"_Successfully")
          window.location.reload(false);
          }).catch(function (error) {
          if (error.response) {
              alert(error.response.data.massage);
          }
        });
      }
    function deleteSeller(data){
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = {
            jwt: Token,
            id: ID
        }
        AdminServices.deletSeller(headers,data.id).then(response =>{ 
          alert("Seller Delete Successfully")
          window.location.reload(false);
          }).catch(function (error) {
          if (error.response) {
              alert(error.response.data.massage);
          }
        });
      }
    

    return (
        <div>
            <div>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand"style={{marginLeft: '10px'}}>AdminPanel</a>
                    <div className="form-inline">
                        <button type="button" className="btn btn-outline-warning my-2 my-sm-0 "style={{marginRight: '17px'}} onClick={() => logout()}><strong>Logout</strong></button>
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
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th> ID</th>
                                        <th> StoreName</th>
                                        <th> Name</th>
                                        <th> Email</th>
                                        <th> Number</th>
                                        <th> GST</th>
                                        <th> Address</th>
                                        <th> PIN</th>
                                        <th> Status</th>
                                        <th> Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sellers.map(
                                            (data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td> {data.id}</td>
                                                        <td> {data.storename}</td>
                                                        <td> {data.name} </td>
                                                        <td> {data.email} </td>
                                                        <td> {data.monumber} </td>
                                                        <td> {data.gst} </td>
                                                        <td> {data.address} </td>
                                                        <td> {data.pin} </td>
                                                        <td> {data.status} </td>
                                                        <td>
                                        
                                                            <button style={{ marginLeft: "5px" }} onClick={() => updateSeller(data,status)} className="btn-success">Active </button>
                                                            <button style={{ marginLeft: "5px" }} onClick={() => updateSeller(data,inactive)} className="btn-warning">Inactive </button>
                                                            <button style={{ marginLeft: "5px" }} onClick={() => deleteSeller(data)} className="btn-danger">Delete </button>

                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            )
}
            export default AdminPanel;