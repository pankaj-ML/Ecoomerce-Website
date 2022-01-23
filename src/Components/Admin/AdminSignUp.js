import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AdminServices from "./AdminServices";

const AdminSignUp = () => {
    const history = useHistory();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().required('Email is required.')
                           .email("Invalid Email."),
        password: Yup.string().required('Password is required.'),
        tc: Yup.boolean().oneOf([true], "You must accept the terms and conditions")
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    function onSubmit(data) {
        
        AdminServices.registerAdmin(data).then(response => {

            console.log(response);
            history.push("/AdminLogin");

        }).catch(function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        });
    }

    return (


        <div className="register-photo">

            <div className="not-found">
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-center"><strong>Admin SignUp</strong></h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name"
                                {...register('name')} />
                            <div className="text-danger">{errors.name?.message}</div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email"
                                {...register('email')} />
                            <div className="text-danger">{errors.email?.message}</div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter password"
                                {...register('password')} />
                            <div className="text-danger">{errors.password?.message}</div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">I agree to the license terms. </label>
                                <input className="form-check-input" type="checkbox" {...register('tc')} />
                                <div className="text-danger">{errors.tc?.message}</div>
                            </div>
                        </div>
                        <br></br>
                        <div className="d-grid gap-2 col-20 mx-auto">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered <Link className="Link" aria-current="page" exact to="/AdminLogin">Login?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminSignUp;