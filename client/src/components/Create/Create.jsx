import React, {useRef} from 'react';
import { motion } from 'framer-motion';
import {ErrorToast, IsEmpty} from "../../helper/FormHelper";
import {useNavigate} from "react-router-dom";
import {NewTaskCreate} from "../../APIRequest/APIRequest";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Create = () => {

    let titleRef , descriptionRef = useRef();
    let navigate = useNavigate();

    const CreateNew = ()=>{
        let title = titleRef.value;
        let description = descriptionRef.value;

        if(IsEmpty(title)){
            ErrorToast("Title Required");
        }

        else if(IsEmpty(description)){
            ErrorToast("Description  Required");
        }

        else {
            NewTaskCreate(title, description).then((res)=>{
                if(res === true){
                    navigate("/New")
                }
            })
        }
    }

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



    return (
        <div className="content-body container-fluid p-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <motion.div variants={inputAnimation} initial="hidden" animate="show" exit="hidden"  className="card p-3">
                        <div className="card-body">
                            <h4 >Create New Task</h4>
                            <br/>
                            <input ref={(input)=>titleRef=input} placeholder="Task Name" className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <textarea ref={(input)=>descriptionRef=input} rows={5} placeholder="Task Description" className="form-control animated fadeInUp" type="text"/>
                            <br/>
                            <button onClick={CreateNew} className="btn float-end btn-primary">Create</button>
                        </div>
                    </motion.div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Create;