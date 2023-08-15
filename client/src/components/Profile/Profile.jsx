import React, {useEffect, useRef, useState} from 'react';
import {GetProfileDetails, RegistrationRequest, UpdateProfile} from "../../APIRequest/APIRequest";
import {useSelector} from "react-redux";
import {getBase64, IsEmpty, IsMobile} from "../../helper/FormHelper";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useNavigate} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {motion} from "framer-motion";
import {getUserDetails, removeSession} from "../../helper/SessionHelper";

const Profile = () => {

    let firstNameRef,lastNameRef,mobileRef,passwordRef,userImgView,userImgRef=useRef()

    useEffect(() => {
        GetProfileDetails()
    }, []);

    const profileData = useSelector((state)=>state.profile.value)


    function PreviewImage() {
        const ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src=base64Img;
        })
    }


    const navigate=useNavigate()

    function UpdateMyProfile() {
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.value;


        if(IsEmpty(firstName)){
            toast.warn('First Name required', {theme: "dark"});
        }
        else if(IsEmpty(lastName)){
            toast.info("Last Name Required !", {theme: "dark"})
        }

        else if(!IsMobile(mobile)){
            toast.info("Valid Mobile Required !", {theme: "dark"})
        }

        else if(IsEmpty(password)){
            toast.info("Password Required !", {theme: "dark"})
        }

        else {
            UpdateProfile(firstName , lastName , mobile , password , photo).then((result)=>{
                if (result){
                    navigate('/')
                }
            })
        }
    }







    //Navbar
    //Navbar
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const toggleMenu = () => {
        setIsOpenNavbar(!isOpenNavbar);
    };
    const onLogOut=()=>{
        removeSession()
    }

    const inputAnimation = {
        hidden:{
            width:"0",
            padding:"0",
            opacity:0,
            transition:{
                duration:0.15
            }
        }
        ,
        show:{
            width: "100%",
            padding: "5px 15px",
            transition:{
                duration:0.2
            },
            opacity: 1
        }
    }

    return (
        <div className="container pt-5">

            <nav className="navbar fixed-top">
                <div className="top-section">

                    <motion.a href="/" initial="hidden" animate="show" exit="hidden" variants={inputAnimation} className="logo text-light text-decoration-none">logo</motion.a>

                </div>

                <div className="profile-menu">
                    <h6 className="float-start px-5 mt-3">{getUserDetails()[0]['FirstName']} {getUserDetails()[0]['LastName']}</h6>
                    <button className="profile-menu-toggle" onClick={toggleMenu}>
                        <img
                            className="profile-menu-avatar"
                            src={getUserDetails()[0]['Photo']}
                            alt="Profile"
                        />

                    </button>
                    {isOpenNavbar && (
                        <ul className="profile-menu-dropdown">
                            <li>
                                <a href="/profile" rel="noopener noreferrer">Profile</a>
                            </li>
                            <li>
                                <a href="/logout" onClick={onLogOut}>Logout</a>
                            </li>
                        </ul>

                    )}
                </div>
            </nav>




            <motion.div initial="hidden" animate="show" exit="hidden" variants={inputAnimation} className="row d-flex justify-content-center mt-5">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img  ref={(input)=>userImgView=input} className="justify-content-center" style={{height:"300px",width:"300px"}} src={profileData['Photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage} ref={(input)=>userImgRef=input} placeholder="Email" className="form-control" type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input defaultValue={profileData['Email']}  readOnly={true}  placeholder="Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input defaultValue={profileData['FirstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input defaultValue={profileData['LastName']}  ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control " type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input defaultValue={profileData['Mobile']} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input defaultValue={profileData['Password']}  ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control" type="password"/>
                                    </div>
                                    <div className="col-4 p-2"></div>
                                    <div className="col-4 p-2">
                                        <button onClick={UpdateMyProfile}  className="btn w-100 float-end btn-primary">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <ToastContainer/>
        </div>
    );
};

export default Profile;