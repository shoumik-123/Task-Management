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
        let photo = "data:image/jpeg;base64,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"

        if(IsEmpty(firstName)){
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
            RegistrationRequest(firstName , lastName , mobile , email, password , photo).then((result)=>{
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
                                <button onClick={onRegistration} className="btn w-100 mb-5 btn-primary">Registration</button>

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