import Swal from "sweetalert2";
import {UpdateStatus} from "../APIRequest/APIRequest";

export function UpdateAlert(id,status) {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {
            New: 'New',
            Completed :'Completed',
            Canceled :'Canceled',
            Progress :'Progress'
        },
        inputValue: status,
    }).then((result)=>{
        UpdateStatus(id,result.value).then((result)=>{
            return result;
        })
    })

}


