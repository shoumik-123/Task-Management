import MasterLayout from "../components/MasterLayout/Master-Layout";
import Page404 from "../pages/Page-404";
import RegistrationPage from "../pages/Registration-Page";
import LoginPage from "../pages/Login-Page";
import ProfilePage from "../pages/Profile-Page";
import CanceledPage from "../pages/Canceled-Page";
import ProgressPage from "../pages/Progress-Page";
import CompletedPage from "../pages/Completed-Page";
import DashboardPage from "../pages/Dashboard-Page";
import CreatePage from "../pages/Create-Page";
import NewPage from "../pages/New-Page";
import {createBrowserRouter, Navigate} from "react-router-dom";
import ForgetPasswordPage from "../pages/ForgetPassword-Page";
import { getToken } from "../helper/SessionHelper";

// Define the router configuration based on token presence
const routerConfig = getToken()
    ? [
        {
            path: "/",
            element: <MasterLayout></MasterLayout>,
            children: [
                {
                    path: "/",
                    element: <DashboardPage></DashboardPage>,
                },
                {
                    path: "/create",
                    element: <CreatePage></CreatePage>,
                },
                {
                    path: "/New",
                    element: <NewPage></NewPage>,
                },
                {
                    path: "/Progress",
                    element: <ProgressPage></ProgressPage>,
                },
                {
                    path: "/Completed",
                    element: <CompletedPage></CompletedPage>,
                },
                {
                    path: "/Canceled",
                    element: <CanceledPage></CanceledPage>,
                },
            ],
        },
        {
            path: "/profile",
            element: <ProfilePage></ProfilePage>,
        },
        {
            path: "*",
            element: <Page404></Page404>,
        }
    ]
    : [
        {
            path: "/",
            element: <Navigate to={"/login"} replace></Navigate>  //Navigate  to login page
        },
        {
            path: "/New",
            element: <Navigate to={"/login"} replace></Navigate>  //Navigate  to login page
        },
        {
            path: "/Progress",
            element: <Navigate to={"/login"} replace></Navigate>  //Navigate  to login page
        },
        {
            path: "/Completed",
            element: <Navigate to={"/login"} replace></Navigate>  //Navigate  to login page
        },
        {
            path: "/Canceled",
            element: <Navigate to={"/login"} replace></Navigate>  //Navigate  to login page
        },

        {
            path: "/login",
            element: <LoginPage></LoginPage>,
        },
        {
            path: "/registration",
            element: <RegistrationPage></RegistrationPage>,
        },
        {
            path: "*",
            element: <Page404></Page404>,
        },
        {
            path: "/forgetPassword",
            element: <ForgetPasswordPage></ForgetPasswordPage>,
        },
    ];

// Create the router based on the configured routes
const router = createBrowserRouter(routerConfig);

export default router;
