import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {
    FaBars,
    FaBatteryThreeQuarters,
    FaCheckCircle,
    FaHouseDamage,
    FaPen, FaPenNib,
    FaRegTrashAlt
} from 'react-icons/fa';

import {NavLink, Outlet} from 'react-router-dom';
import '../../assets/css/sideBar.css';
import '../../assets/css/navbar.css'
import {getUserDetails, removeSession} from "../../helper/SessionHelper";

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        icon: FaHouseDamage,
    },
    {
        path: '/create',
        name: 'Create',
        icon: FaPen,
    },

    {
        path: '/New',
        name: 'New',
        icon: FaPenNib,
    },
    {
        path: '/Progress',
        name: 'Progress',
        icon: FaBatteryThreeQuarters,
    },
    {
        path: '/Completed',
        name: 'Completed',
        icon: FaCheckCircle,
    },
    {
        path: '/Canceled',
        name: 'Canceled',
        icon: FaRegTrashAlt,
    },
];

const MasterLayout = () => {


    // sidebar
    const sidebarVariants = {
        open: { x: 1 },
        closed: { x: '-100%' },
    };

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
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
            width: "140px",
            padding: "5px 15px",
            transition:{
                duration:0.2
            },
            opacity: 1
        }
    }




    //Navbar
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const toggleMenu = () => {
        setIsOpenNavbar(!isOpenNavbar);
    };

    return (

        <div>
            <nav className="navbar fixed-top">
                <div className="top-section">
                    <div>
                        <FaBars onClick={toggle} />
                    </div>
                    <motion.h1 initial="hidden" animate="show" exit="hidden" variants={inputAnimation} className="logo">logo</motion.h1>

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
                                <a href="https://www.facebook.com/shoumik152/" target="_blank" rel="noopener noreferrer">Profile</a>
                            </li>
                            <li>
                                <a href="/settings">Settings</a>
                            </li>
                            <li>
                                <a href="/logout" onClick={onLogOut}>Logout</a>
                            </li>
                        </ul>

                    )}
                </div>
            </nav>


            <div className="main-container mt-5" style={{ width: isOpen}}>
                <div className="sidebar mt-3">
                    <motion.div className="sidebar" initial="closed" animate="open" variants={sidebarVariants}>


                        <section className="routes">
                            {routes.map((route) => (
                                <NavLink activeClassName="active" to={route.path} key={route.name} className="link">
                                    <div className="icon">
                                        <route.icon/>
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && <motion.div className="link-text" initial="hidden" animate="show" exit="hidden" variants={inputAnimation} >{route.name}</motion.div>}
                                    </AnimatePresence>

                                </NavLink>
                            ))}
                        </section>
                    </motion.div>
                </div>

                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default MasterLayout;