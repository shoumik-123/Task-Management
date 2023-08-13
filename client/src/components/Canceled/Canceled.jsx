import React, {useEffect} from 'react';
import {motion} from "framer-motion";
import {FaPen, FaRegCalendarAlt, FaRegClipboard} from "react-icons/fa";
import {TaskListByStatus} from "../../APIRequest/APIRequest";
import {useSelector} from "react-redux";
import {DeleteTaskAlert} from "../../helper/DeleteAlert";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const Canceled = () => {

    useEffect(() => {
        TaskListByStatus("Canceled");
    }, []);

    const CanceledList = useSelector((state)=> state.task.Canceled)   //redux


    const DeleteItem = (id)=>{
        DeleteTaskAlert(id).then((result)=>{
            if(result===true){
                TaskListByStatus("Canceled");
            }
        })
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
            transition:{
                duration:0.2
            },
            opacity: 1
        }
    }

    return (
        <div>
            <div className="content-body container-fluid p-5">
                <div className="row p-0 m-0">
                    <div className="col-12 col-md-6 col-lg-8 ">
                        <motion.h5 variants={inputAnimation} initial="hidden" animate="show" exit="hidden" >Task Canceled</motion.h5>
                    </div>
                    <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                        <motion.div variants={inputAnimation} initial="hidden" animate="show" exit="hidden" className="row">
                            <div className="col-8">
                                <input placeholder="search" className="form-control w-100"/>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary w-100">Search</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="row pt-5">
                    {
                        CanceledList.map((item , i)=>
                            <div key={i.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                            <motion.div variants={inputAnimation} initial="hidden" animate="show" exit="hidden" className="card h-100">
                            <div className="card-body">
                            <h6>{item.Title}</h6>
                            <p>{item.Description}</p>
                            <p>
                            <FaRegCalendarAlt/> {item.CreateDate}
                            <a className="icon-nav text-primary mx-1"><FaPen /></a>
                            <a onClick={DeleteItem.bind(this,item._id)} className="icon-nav text-danger mx-1"><FaRegClipboard /></a>
                            <a className="badge btn float-end bg-danger">{item.Status}</a>
                            </p>
                            </div>
                            </motion.div>
                            </div>
                        )
                    }

                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};


export default Canceled;