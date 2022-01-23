import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SellerServices from "./SellerServices";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";

const SellerPanel = () => {
     //------------------------------------------Product Fetch
    const [product, setProduct] = useState([{}]);
    useEffect(() => {
        SellerServices.getProduct().then(Response => {
            setProduct(Response.data);
            console.log(product)
        }).catch(function (error) {
            if (error.Response) {
                alert("Error in Get Product");
            }
        });
    }, []);
    //-----------------------------------------Form Validation
    const num = "[1-9]"
    const validationSchema = Yup.object().shape({
        price: Yup.string().required('Price is required.')
            .matches(num, 'Price require only Numbers'),
        category: Yup.string().required('Category is required.'),
        description: Yup.string().required('description is required.'),
        name: Yup.string().required('Product Name is required.'),
        file: Yup.mixed().nullable("File Required")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors } = formState;

    //-----------------------------------------Addproduct
    const [open, setOpen] = useState(false)
    const setMOpen = () => { setOpen(true) }
    const setMClose = () => { setOpen(false) }
    function addProduct() {
        setMOpen();
    }
    function close() {
        setMClose();
    }
    const onUplod = (data) => {
        var l = document.getElementById("load");
        l.innerHTML = "<img src=\"https://i.gifer.com/VAyR.gif\" width=\"100px\" height=\"100px\">";
        let formdata = new FormData();
        formdata.append("name", data.name)
        formdata.append("price", data.price)
        formdata.append("description", data.description)
        formdata.append("category", data.category)
        formdata.append("email", localStorage.getItem('email'))
        formdata.append("seller", localStorage.getItem('seller'))
        formdata.append("images", data.file[0])
        axios({
            //url: 'http://localhost:8081/Product/add',
            url: 'http://productservices-env.eba-98pbwf84.us-east-2.elasticbeanstalk.com/Product/add',
            method: "POST",
            data: formdata
        }).then((response) => {
            console.log(response)
            alert(response.data)
            window.location.reload(false);
            l.innerHTML = " ";
            close()
        }).catch(function (error) {
            if (error.response) {
                l.innerHTML = " ";
                if(error.response.data.error = "Bad Request")
                {
                    alert("Please Upload File")   
                }
                else{
                    alert("Error in Upload File") 
                }
            }
        });
    }
    //-----------------------------------------------Update Product
    const [openupdate, setOpenupdate] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState([]);
    const setUOpen = () => { setOpenupdate(true) }
    const setUClose = () => { setOpenupdate(false) }
    function updateProductM(data) {
        setUOpen();
        setId(data.id)
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
    }
    function Updateclose() {
        setUClose();
    }
    function updateIMG(e) {
        setFile(e.target.files[0])
    }
    const onPUpdate = (e) => {
        var l = document.getElementById("load");
        l.innerHTML = "<img src=\"https://i.gifer.com/VAyR.gif\" width=\"100px\" height=\"100px\">";
        e.preventDefault();
        const product = { id, name, description, price, file }
        let formdata = new FormData();
        formdata.append("name", product.name)
        formdata.append("price", product.price)
        formdata.append("description", product.description)
        formdata.append("category", product.category)
        formdata.append("email", localStorage.getItem('email'))
        formdata.append("seller", localStorage.getItem('seller'))
        formdata.append("images", product.file)
        console.log(formdata)
        axios({
           // url: 'http://localhost:8081/Product/update/' + product.id,
            url : 'http://productservices-env.eba-98pbwf84.us-east-2.elasticbeanstalk.com/Product/update/'+product.id,
            method: "PUT",
            data: formdata
        }).then((response) => {
            console.log(response)
            l.innerHTML = " ";
            window.location.reload(false);
            alert("Product Update Successfully")
            close();
        }).catch(function (error) {
            if (error.response) {
                l.innerHTML = " ";
                if(error.response.data.error = "Bad Request")
                {
                    alert("Please Upload File")   
                }
                else{
                    alert("Error in Upload File") 
                }
            }
        });
    }

    //-------------------------------------------------Delete Product
    function deleteProduct(id) {
        SellerServices.deleteProduct(id).then(response => {
            alert(response.data.message)
            window.location.reload(false);

        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }

    //------------------------------------------------Logout
    const history = useHistory();
    function logout() {
        const Token = localStorage.getItem('userToken');
        const ID = localStorage.getItem('userId')
        const headers = {
            jwt: Token,
            id: ID
        }
        SellerServices.logoutSeller(headers).then(Response => {
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

    return (
        <div>
            <div>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand" style={{ marginLeft: '10px' }}><h3>SellerPanel</h3></a>
                    <div className="form-inline">

                        <button type="button" className="btn btn-outline-info my-2 my-sm-0" style={{ marginRight: '20px' }} onClick={() => addProduct()}><strong>AddProduct</strong></button>
                        <button type="button" className="btn btn-outline-warning my-2 my-sm-0" style={{ marginRight: '20px' }} onClick={() => logout()}><strong>Logout</strong></button>
                    </div>
                </nav>
            </div>

            <Modal size="ms" show={open} className="modal" aria-labelledby="contained-modal-title-vcenter" >
                <form className="form-control container cityupdate">
                    <h5 style={{ color: "white" }}>Add Product</h5>

                    <div className="col-md-8">
                        <form className="FileUpload" method="POST" encType="multipart/form-data" >
                            <h3>Add Product</h3>
                            <div className="process">
                                <p id="load"></p>
                            </div>
                            <label ><b>Product Name:</b></label>
                            <input className="form-control pform" type="text" placeholder="Product Name" name="name"
                                {...register('name')} />
                            <div className="text-danger">{errors.name?.message}</div>

                            <label><b>Category:</b></label>
                            <select id="designation" className="form-control-dropdown mt-2 pform " {...register('category')}>
                                <option value="Mobile">Mobile</option>
                                <option value="Cloths">Cloths</option>
                                <option value="Kitchen" selected>Home/Kitchen</option>
                                <option value="Kitchen" selected>Health Care</option>
                            </select>
                            <div className="text-danger">{errors.category?.message}</div>

                            <label ><b>Description:</b></label>
                            <textarea class="form-control pform" type="text" placeholder="Enter description" name="message" rows="4" cols="55"
                                {...register('description')}
                            ></textarea>
                            <div className="text-danger">{errors.description?.message}</div>

                            <label ><b>Price:</b></label>
                            <input class="form-control pform" type="text" placeholder="Enter price" name="price"
                                {...register('price')} />
                            <div className="text-danger">{errors.price?.message}</div>

                            <label ><b>Image:</b></label>
                            <input class="form-control mb-2 pform" type="file" name="picture" {...register('file')} />
                            <div className="text-danger">{errors.file?.message}</div>

                            <button type="button" className="btn-info pbtn" onClick={handleSubmit(onUplod)}>Add Product</button>
                            <button type="button" className="btn-danger" style={{ marginRight: '20px' }} onClick={() => close()}><strong>Close</strong></button>
                            <div class="process" >
                                <p id="load"></p>
                            </div>
                        </form>
                    </div>
                </form>
            </Modal>


            <Modal size="md" show={openupdate} className="modal" aria-labelledby="contained-modal-title-vcenter" >
                <form className="form-control container cityupdate">
                    <div className="col-md-8">
                        <form className="FileUpload" method="POST" encType="multipart/form-data" >
                            <h3>Update Product</h3>
                            <div className="process">
                                <p id="load"></p>
                            </div>
                            <label ><b>Product Name:</b></label>
                            <input value={name} onChange={(e) => setName(e.target.value)} class="form-control pform" type="text" placeholder="Product Name" name="name"
                            />
                            <div className="text-danger">{errors.name?.message}</div>

                            <label ><b>Description:</b></label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} class="form-control pform" type="text" placeholder="Enter description" name="message" rows="4" cols="55"

                            ></textarea>
                            <div className="text-danger">{errors.description?.message}</div>

                            <label ><b>Price:</b></label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} class="form-control pform mb-2" type="text" placeholder="Enter price" name="price"
                            />
                            <div className="text-danger">{errors.price?.message}</div>


                            <input class="form-control pform" onChange={updateIMG} type="file" name="file" />
                            <div className="text-danger">{errors.file?.message}</div>
                            <button type="button" className="btn-info pbtn" onClick={(e) => onPUpdate(e)}>Update Product</button>
                            <button type="button" className="btn-danger" style={{ marginRight: '20px' }} onClick={() => Updateclose()}><strong>Close</strong></button>
                            <div class="process" >
                                <p id="load"></p>
                            </div>
                        </form>
                    </div>
                </form>
            </Modal>


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
                                        <th> Image</th>
                                        <th> name</th>
                                        <th> category</th>
                                        <th> Discription</th>
                                        <th> Price</th>
                                        <th> Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map(
                                            (data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td> {data.id}</td>
                                                        <td> <img src={data.images} style={{backgroundColor:'white'}} /></td>
                                                        <td> {data.name} </td>
                                                        <td> {data.category} </td>
                                                        <td> {data.description} </td>
                                                        <td> {data.price} </td>
                                                        <td>
                                                            <button onClick={() => updateProductM(data)} className="btn-info">Update </button>
                                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteProduct(data.id)} className="btn-danger">Delete </button>
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
export default SellerPanel;