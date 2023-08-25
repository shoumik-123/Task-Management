import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state/settings-slice";
import {getToken, setEmail, setOTP, setToken, setUserDetails} from "../helper/SessionHelper";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state/task-slice";
import {SetSummary} from "../redux/state/summary-slice";
import {SetProfile} from "../redux/state/profil-slice";

const BaseURL = "http://localhost:8080/api/v1"


const AxiosHeader ={headers:{"token-key":getToken()}}



export function RegistrationRequest(firstName , lastName , mobile , email, password , photo) {

    //api call start
    store.dispatch(ShowLoader())



    let URL = BaseURL + "/registration";
    let PostBody = {
        Email :email,
        FirstName :firstName,
        LastName :lastName,
        Mobile :mobile,
        Password :password,
        Photo :photo
    }



    return axios.post(URL,PostBody).then((res)=>{
        // api call end
        store.dispatch((HideLoader()))


        if(res.status===200){
            if(res.data['status'] === "fail"){
                if (res.data['data']['keyPattern']['email']) {
                    ErrorToast("Email Already Exists");
                    return false;
                } else {
                    ErrorToast("Registration Fail");
                    return false;
                }

            }
            else {
                SuccessToast("Registration Successful")
                return true;
            }
        }
        else {
            ErrorToast("Something Wrong")
            return false;
        }
    }).catch((err)=>{
        //api call end
        store.dispatch((HideLoader()))


        ErrorToast("Something Wrong")
        return false;
    })
}
export function LoginRequest(email,password) {

    //api call start
    store.dispatch(ShowLoader())

    let URL = BaseURL + "/login";
    let PostBody = {
        Email :email,
        Password :password
    }
    return axios.post(URL , PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            setToken(res.data['token'])
            setUserDetails(res.data['data'])
            SuccessToast("Login Success")
            return true;
        }
        else {
            ErrorToast("Invalid Email or Password")
            return false;
        }
    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("Something Wrong")
        return false;
    })
}



export function NewTaskCreate(title ,description) {

    //api call start
    store.dispatch(ShowLoader())

    let URL = BaseURL + "/createTask";
    let PostBody = {
        Title: title,
        Description: description,
        Status : "New"
    }

    console.log(AxiosHeader)
    return axios.post(URL,PostBody, AxiosHeader).then((res)=>{
        // api call end
        store.dispatch((HideLoader()))


        if(res.status===200){
            SuccessToast("Task Create Successful")
            return true;
        }
        else {
            ErrorToast("Task Create Fail")
            return false;
        }
    }).catch((err)=>{
        //api call end
        store.dispatch((HideLoader()))

        ErrorToast("Something Wrong")
        console.log(err)
        return false;
    })
}
export function TaskListByStatus(Status) {

    //api call start
    store.dispatch(ShowLoader())

    const URL = BaseURL + "/listTaskByStatus/" + Status;
    return axios.get(URL, AxiosHeader)
    .then((res)=>{
    // api call end
        store.dispatch((HideLoader()))


        if(res.status===200){
            if(Status==="New"){
                store.dispatch(SetNewTask(res.data['data']))
            }
            else if(Status==="Completed"){
                store.dispatch(SetCompletedTask(res.data['data']))
            }
            else if(Status==="Progress"){
                store.dispatch(SetProgressTask(res.data['data']))
            }
            else if(Status==="Canceled"){
                store.dispatch(SetCanceledTask(res.data['data']))
            }
        }
        else {
            ErrorToast("Something Wrong1")
            return false;
        }
    })
    .catch((err)=>{

        //api call end
        store.dispatch((HideLoader()))

        ErrorToast("Something Wrong2")
        return false;
    })
}
export function TaskStatusByCount(Status) {

    //api call start
    store.dispatch(ShowLoader())

    const URL = BaseURL + "/taskStatusByCount";
    return axios.get(URL,AxiosHeader)
    .then((res)=>{
    // api call end
        store.dispatch((HideLoader()))


        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else {
            ErrorToast("Something Wrong")
            return false;
        }
    })
    .catch((err)=>{

        //api call end
        store.dispatch((HideLoader()))

        ErrorToast("Something Wrong")
        return false;
    })
}




//problem
export function DeleteRequest(id) {
    store.dispatch(ShowLoader())
    const URL = BaseURL + "/deleteTask/" + id;

    console.log("aaaa",AxiosHeader,"id",id)

    return axios.post(URL,AxiosHeader)

        .then((res)=>{
            console.log('hello axios')
            store.dispatch(HideLoader())
            if(res.status===200){
                SuccessToast("Task Delete Successful")
                return true;
            }
            else {
                ErrorToast("Something Wrong")
                return false;
            }
        })
        // .catch((err) => {
        //     store.dispatch(HideLoader());
        //     ErrorToast("Something Wrong 2");
        //     if (axios.isAxiosError(err)) {
        //         console.log("Axios Error:", err.response); // This will show the full response object
        //     } else {
        //         console.log("Other Error:", err);
        //     }
        //     return false;
        // });

}



export function UpdateStatus(id,status) {
    store.dispatch(ShowLoader())

    const URL = BaseURL + "/updateTaskStatus/"+id+"/"+status;

    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader());

        if(res.status===200){
            SuccessToast("Update Successful")
            return true;
        }
        else {
            ErrorToast("Something Wrong")
            return false;
        }
    }) .catch((err)=>{

        //api call end
        store.dispatch((HideLoader()))

        ErrorToast("Something Wrong2")
        return false;
    })
}
export function GetProfileDetails() {
    store.dispatch(ShowLoader())

    const URL = BaseURL + "/ProfileDetails"

    axios.get(URL,AxiosHeader)
        .then((res)=>{
            store.dispatch(HideLoader())
            if (res.status===200){
                store.dispatch(SetProfile(res.data['data'][0]))
            }
            else {
                ErrorToast("Something Wrong")
            }
        })
        .catch((err)=>{
            store.dispatch(HideLoader())
            ErrorToast("Something Wrong")
        })
}
export function UpdateProfile(firstName,lastName,mobile,password,photo) {
    store.dispatch(ShowLoader());

    const URL = BaseURL + "/profileUpdate"
    let PostBody = {
        FirstName :firstName,
        LastName :lastName,
        Mobile :mobile,
        Password :password,
        Photo :photo
    }
    let UserDetails = [{
        FirstName :firstName,
        LastName :lastName,
        Mobile :mobile,
        Photo :photo
    }]

    return axios.post(URL,PostBody,AxiosHeader)
        .then((result)=>{
            store.dispatch(HideLoader())
            setUserDetails(UserDetails)
            if(result.status===200){
                SuccessToast("Profile Update Successful")
                return true;
            }
            else {
                ErrorToast("Profile Update Failed")
                return false;
            }
        })
        .catch((err)=>{
            store.dispatch(HideLoader())
            ErrorToast("Something Wrong")
            return false;
        })

}



//Recover Password
export function RecoverVerifyEmail(email) {
    store.dispatch(ShowLoader())

    let URL = BaseURL +"/RecoverVerifyEmail/"+email;

    return axios.get(URL)
        .then((result)=>{
            store.dispatch(HideLoader())

            if(result.status===200){
                if(result.data[['status']] ==="Fail"){
                    ErrorToast("No user Found")
                    return false;
                }
                else {
                    setEmail(email)
                    SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                    return true;
                }

            }
            else {
                ErrorToast("Something Wrong")
            }
        })
        .catch((err)=>{
            store.dispatch(HideLoader())
            ErrorToast("Something Wrong")
            return false;
        })
}

export function RecoverVerifyOTP(email,OTP) {
    store.dispatch(ShowLoader())

    let URL = BaseURL +  "/RecoverVerifyOTP/" + email +"/"+OTP;


    return axios.get(URL)
        .then((result)=>{
            store.dispatch(HideLoader())

            if(result.status===200){
                if (result.data['status']==="Fail"){
                    ErrorToast("Invalid OTP")
                    return false;
                }
                else {
                    setOTP(OTP);
                    SuccessToast("Code Verification Success");
                    return true;
                }

            }
            else {
                ErrorToast("Something Wrong")
                return false
            }
        })
        .catch((err)=>{
            store.dispatch(HideLoader())
            ErrorToast("Something Wrong")
            return false;
        })
}



export function RecoverResetPassword(email,OTP,Password) {
    store.dispatch(ShowLoader())

    let URL = BaseURL +  "/RecoverResetPassword"

    let PostBody={
        Email :email,
        Otp :OTP,
        Password:Password
    }

    return axios.post(URL,PostBody)
        .then((result)=>{
            store.dispatch(HideLoader())

            if(result.status===200){
                SuccessToast("Password Change Successfully")
                return true;
            }
            else {
                ErrorToast("Something Wrong")
            }
        })
        .catch((err)=>{
            store.dispatch(HideLoader())
            ErrorToast("Something Wrong")

            return false;
        })
}


