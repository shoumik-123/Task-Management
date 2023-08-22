import React, {Fragment, useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty, SuccessToast} from "../../helper/FormHelper";
import {RecoverResetPassword} from "../../APIRequest/APIRequest";
import {useNavigate} from "react-router-dom";
import {getEmail, getOTP} from "../../helper/SessionHelper";

const CreatePassword = () => {
    let navigate = useNavigate()
    let PasswordRef , ConfirmPasswordRef = useRef();
    function ResetPassword() {
        let Password= PasswordRef.value;
        let ConfirmPassword = ConfirmPasswordRef.value;

        if(IsEmpty(Password)){
            ErrorToast("Password Required")
        }
        else if(IsEmpty(ConfirmPassword)){
            ErrorToast("Confirm Password Required")
        }
        else if(Password!==ConfirmPassword) {
            ErrorToast("Password & Confirm Password is not same!")
        }
        else {
            RecoverResetPassword(getEmail(),getOTP(),Password).then((result)=>{
                console.log(getOTP(),getEmail(),result)
                if(result===true){
                    navigate("/login")
                    SuccessToast("Password Change Successfully")

                }
            })
        }
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input readOnly={true} placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input  ref={(input)=>PasswordRef=input} placeholder="New Password" className="form-control" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input  ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control" type="password"/>
                                <br/>
                                <button onClick={ResetPassword} className="btn w-100 float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;