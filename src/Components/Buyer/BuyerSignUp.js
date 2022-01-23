import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import BuyerServices from "./BuyerServices";
import "./BuyerSignUp.css";

const BuyerSignUp = () => {
    const history = useHistory();
    const num = "[1-9]"
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('Email is required.')
                           .email("Invalid Email."),
        mobile: Yup.string().required('mobile No is required.')
                           .matches(num, 'mobile require only Numbers')
                           .test('len', 'Must be exactly 10 characters', val => val.length === 10),  
        address: Yup.string().required('Address is required.'),       
        city: Yup.string().required('City is required.'),
        state: Yup.string().required('State is required.'), 
        pincode: Yup.string().required('pincode No is required.')
                             .matches(num, 'pincode require only Numbers'),
        password: Yup.string().required('Password is required.'),
        tc: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    function onSubmit(data) {
        BuyerServices.registerBuyer(data).then(response => {
            console.log(response);
            history.push("/");
        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }

    return (
    <div className="container-fluid">
       <div className="register-photo" >
            <div className="not-found">
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-center"><strong>Buyer SignUp</strong></h2>
                        <div className="form-group">
                            <input type="text" className="form-control inBuyer" placeholder="Name"
                                {...register('name')} />
                            <div className="text-danger">{errors.name?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <input type="email" className="form-control inBuyer" placeholder="Email"
                                {...register('email')} />
                            <div className="text-danger">{errors.email?.message}</div>
                        </div>

                        
                        <div className="form-group">
                            <input type="text" className="form-control inBuyer" placeholder="mobile Number"
                                {...register('mobile')} />
                            <div className="text-danger">{errors.mobile?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <textarea type="text" className="form-control inBuyer" placeholder="Address"
                                {...register('address')} />
                            <div className="text-danger">{errors.address?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" className="form-control inBuyer" placeholder="City"
                                {...register('city')} />
                            <div className="text-danger">{errors.city?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" className="form-control inBuyer" placeholder="State"
                                {...register('state')} />
                            <div className="text-danger">{errors.state?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" className="form-control inBuyer" placeholder="pincode"
                                {...register('pincode')} />
                            <div className="text-danger">{errors.pincode?.message}</div>
                        </div>

                        
                        <div className="form-group">
                            <input type="password" className="form-control inBuyer" placeholder="Enter password"
                                {...register('password')} />
                            <div className="text-danger">{errors.password?.message}</div>
                        </div>
                        
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">I agree to the license terms. </label>
                                <input className="form-check-input" type="checkbox" {...register('tc')} />
                                <div className="text-danger">{errors.tc?.message}</div>
                            </div>
                        </div>
                        
                        <div className="d-grid gap-2 col-20 mx-auto">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered <Link className="Link" aria-current="page" exact to="/BuyerLogin">Login?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )

}
export default BuyerSignUp;