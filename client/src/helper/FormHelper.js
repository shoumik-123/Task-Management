import {toast} from "react-toastify";
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const mobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;





class FormHelper {
    IsEmpty(value){
        return value.length===0;
    }

    IsMobile(value){
        return mobileRegex.test(value);
    }

    IsEmail(value){
        return emailRegex.test(value);
    }

    SuccessToast(msg){
         toast.success(msg, {
            theme: "colored",
        });
    }
    ErrorToast(msg){
         toast.error(msg, {
            theme: "colored",
        });

    }


    //Convert img to base64 js method
    getBase64(file){
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err)
        })
    }



}


export const {
    IsEmpty,
    IsMobile,
    IsEmail,
    SuccessToast,
    ErrorToast,
    getBase64
} = new FormHelper();

