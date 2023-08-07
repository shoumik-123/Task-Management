import axios from "axios";
import {ErrorToast, SuccessToast} from "../helper/FormHelper";
import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state/settings-slice";
import {getToken, setToken, setUserDetails} from "../helper/SessionHelper";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state/task-slice";

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
                    ErrorToast("Something Went Wrong");
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
            ErrorToast("Something Wrong")
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
        if (err.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            console.error('No response received:', err.request);
        } else {
            // Something else happened while setting up the request
            console.error('Error setting up request:', err.message);
        }
        console.error('Error config:', err.config);
        return false;
    })
}


