import React, { useState, useEffect } from "react";
import ProductService from "./ProductService";
import "./ListProducts.css";
import CartServices from '../Home/CartServices';
import { useHistory } from "react-router-dom";

function ListProducts() {
  //..................................................... Search 
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const history = useHistory()
  useEffect(() => { getProducts(); setSearch(search) }, []);

  const onSearch = (e) => {
    if (search === '') {
      alert("Search can Not be Empty")
      getProducts()
      history.push('/')
    }
    else {
      ProductService.searchProduct(search).then((response) => {
        if (response.data == 'Products not Exist') {
          alert("Products not Exist")
          getProducts()
          history.push('/')
        }
        else if (response.data !== null) {
          setProducts(response.data);
        }
      })
    }
  }
//-----------------------------------------------Get All products
  const getProducts = () => {
    ProductService.getProducts().then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  };
  const addtocart = (data) => {

    const buyer = JSON.parse(localStorage.getItem('userdata'))
    if (!buyer) {
      alert("Login First")
    }
    else {
      CartServices.addtoCart(buyer.id, data.id).then(res => {

        alert(res.data)
      }).catch(function (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
    }
  }
  return (
    <div>
      <div className="input-group w">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control s" placeholder="Search products" />
        <button onClick={e => onSearch()} className="btn btn-outline-warning " type="button" id="button-addon2">Search</button>
      </div>
      <div className="clearfix">

        <div className="row">
          {products.map((data) => (
            <div className="col-md-4 animated fadeIn" key={data.id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img src={data.images} className="card-img-top" alt="img" />
                  </div>
                  <h5 className="card-title" >{data.name}</h5>
                  <p className="card-text">
                    {data.description}
                    <br />
                    <span className="price">Rs:{data.price}</span>
                    <br />
                    <span >Seller:{data.seller}</span>
                  </p>
                </div>
                <button className="button" onClick={e => addtocart(data)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListProducts;