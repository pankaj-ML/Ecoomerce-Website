import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import BuyerServices from "./BuyerServices";

const BuyerLogin = () => {

    const history = useHistory();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required.')
                           .email("Invalid Email."),
        password: Yup.string().required('Password is required.'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        BuyerServices.loginBuyer(data).then(res => {
            localStorage.setItem('userdata', JSON.stringify(res.data));
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('userId', res.data.id);
            history.push("/");
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(error.response.data.message);
            }
        });
    }

    return (
        <html>
            {/* <head>
                <script type="text/javascript">
                    window.history.forward();
                    function noBack() {
                        window.history.forward()
                    }
                </script>
            </head> */}
            <body>


                <div className="register-photo">

                    <div className="not-found">

                        <div className="form-container">

                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <h3 className="text-center"><strong>Buyer Login</strong></h3>
                                <div className="form-group">
                                    <input className="form-control" type="email" name="email" placeholder="Email" {...register('email')} />
                                    <div className="text-danger">{errors.email?.message}</div>

                                </div>
                                <br></br>
                                <div className="form-group">
                                    <input className="form-control" type="password" name="password" placeholder="Password" {...register('password')} />
                                    <div className="text-danger">{errors.password?.message}</div>
                                </div>
                                <br></br>

                                <div className="d-grid gap-2 col-20 mx-auto">
                                    <button type="submit" className="btn btn-warning">Log in</button>
                                </div>

                                <p className="forgot-password text-right">
                                    Not an account? <Link className="Link" aria-current="page" exact to="/BuyerSignUp">SignUp here.</Link>
                                </p>
                               
                            </form>
                        </div>
                    </div>
            </body>
        </html>
    )
}

export default BuyerLogin;