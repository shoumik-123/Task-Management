// import {Fragment} from "react";
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import DashboardPage from "./pages/Dashboard-Page";
// import CreatePage from "./pages/Create-Page";
// import NewPage from "./pages/New-Page";
// import ProgressPage from "./pages/Progress-Page";
// import CompletedPage from "./pages/Completed-Page";
// import CanceledPage from "./pages/Canceled-Page";
// import ProfilePage from "./pages/Profile-Page";
// import LoginPage from "./pages/Login-Page";
// import RegistrationPage from "./pages/Registration-Page";
// import Page404 from "./pages/Page-404";
// import ForgetPasswordPage from "./pages/ForgetPassword-Page";
// import MasterLayout from "./components/MasterLayout/Master-Layout";
// import FullScreenLoader from "./components/MasterLayout/FullScreen-Loader";
//
//
// function App() {
//   return (
//       <Fragment>
//           <FullScreenLoader/>
//           <BrowserRouter>
//               <MasterLayout/>
//               <Routes>
//
//                   <Route exact path="/" element={<DashboardPage/>}/>
//                   <Route exact path="/create" element={<CreatePage/>}/>
//                   <Route exact path="/all" element={<NewPage/>}/>
//                   <Route exact path="/progress" element={<ProgressPage/>}/>
//                   <Route exact path="/complete" element={<CompletedPage/>}/>
//                   <Route exact path="/cancel" element={<CanceledPage/>}/>
//                   <Route exact path="/profile" element={<ProfilePage/>}/>
//                   <Route exact path="/login" element={<LoginPage/>}/>
//                   <Route exact path="/registration" element={<RegistrationPage/>}/>
//                   <Route exact path="*" element={<Page404/>}/>
//                   <Route exact path="/forgetPassword" element={<ForgetPasswordPage/>}/>
//               </Routes>
//           </BrowserRouter>
//       </Fragment>
//   );
// }
//
// export default App;




import { RouterProvider } from 'react-router-dom';
import AppRouter from "./Routes/routes";
import FullScreenLoader from "./components/MasterLayout/FullScreen-Loader";


function App() {
    return (
        <div>
            <RouterProvider router={AppRouter}></RouterProvider>
            <FullScreenLoader/>
        </div>
    );
}

export default App;