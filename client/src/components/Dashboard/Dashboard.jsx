import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {

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
        <div className="container-fluid p-5">
            <div className="col-12 col-lg-2 col-md-3 col-sm-6 m-2 p-2">
                <motion.div variants={inputAnimation} initial="hidden" animate="show" exit="hidden"   className="card p-3 h-100">
                    <motion.h5 variants={inputAnimation} initial="hidden" animate="show" exit="hidden" className="animated fadeInUp">Total</motion.h5>
                    <motion.h6 variants={inputAnimation} initial="hidden" animate="show" exit="hidden" className="text-secondary animated fadeInUp">00</motion.h6>
                </motion.div>
            </div>
        </div>

    );
};

export default Dashboard;