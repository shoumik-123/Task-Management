import React, {Fragment, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import { IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {RegistrationRequest} from "../../APIRequest/APIRequest";

const Registration = () => {
    const inputAnimation = {
        hidden: {
            width: "0",
            padding: "0",
            opacity: 0,
            transition: {
                duration: 0.05
            }
        },
        show: {
            width: "100%",
            transition: {
                duration: 0.2
            },
            opacity: 1
        }
    };


    let firstNameRef , lastNameRef , mobileRef , emailRef , passwordRef= useRef()

    const navigate = useNavigate();

    const onRegistration =()=>{
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let email = emailRef.value;
        let password = passwordRef.value;

        if(IsEmpty(firstName)){
            toast();
            toast.warn('First Name required', {theme: "dark"});
        }
        else if(IsEmpty(lastName)){
            toast.info("Last Name Required !", {theme: "dark"})
        }

        else if(!IsMobile(mobile)){
            toast.info("Valid Mobile Required !", {theme: "dark"})
        }

        else if(!IsEmail(email)){
            toast.info("Valid Email Required !", {theme: "dark"})
        }

        else if(IsEmpty(password)){
            toast.info("Password Required !", {theme: "dark"})
        }

        else {
            console.log("Ok")
            RegistrationRequest(firstName , lastName , mobile , email, password , "").then((result)=>{
                if (result){
                    navigate('/login')
                }
            })
        }

    }



    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <motion.div initial="hidden" animate="show" exit="hidden"  variants={inputAnimation} className="card w-100 p-4">
                            <div className="card-body">
                                <motion.h5 initial="hidden" animate="show" exit="hidden"  variants={inputAnimation}>Sign Up</motion.h5>
                                <br/>
                                <input ref={(input)=>firstNameRef= input} placeholder="First Name" type="text" className="form-control"/>
                                <br/>
                                <input ref={(input)=>lastNameRef= input} placeholder="Last Name" type="text" className="form-control"/>
                                <br/>
                                <input ref={(input)=>mobileRef= input} placeholder="Mobile" type="number" className="form-control"/>
                                <br/>
                                <input ref={(input)=>emailRef= input} placeholder="Email" type="email" className="form-control"/>
                                <br/>
                                <input ref={(input)=>passwordRef= input} placeholder="Password" type="password" className="form-control"/>
                                <br/>
                                <button onClick={onRegistration} className="btn w-100 float-end btn-primary mb-5">Registration</button>

                                <div className="text-center w-100">
                                    <Link className="text-center text-decoration-none" to="/login">Sign In</Link>
                                    <br/>
                                    <Link className="text-center text-decoration-none" to="/forgetPassword">Forget Password</Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <ToastContainer/>
                </div>

            </div>

        </Fragment>
    );
};

export default Registration;