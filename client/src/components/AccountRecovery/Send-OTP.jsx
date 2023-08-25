import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmail} from "../../helper/FormHelper";
import {RecoverVerifyEmail} from "../../APIRequest/APIRequest";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
    let navigate = useNavigate()

    let emailRef = useRef()
    function VerifyEmail() {
        let email = emailRef.value;

        if(IsEmail(email)){
            ErrorToast("Email is not Valid")
        }
        else {
            RecoverVerifyEmail(email).then((result)=>{
                if(result===true){
                    navigate("/verifyOTP")
                }
            })
        }

    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h3>EMAIL ADDRESS</h3>
                                <br/>
                                <h6>Your email address</h6>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail}  className="btn w-100 float-end btn-primary">Send OTP Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOtp;