import Swal from "sweetalert2";
import {DeleteRequest} from "../APIRequest/APIRequest";

export function DeleteTaskAlert(id){
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3a84cc',
        cancelButtonColor: '#ab3c3c',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            return  DeleteRequest(id).then((DeleteResult)=>{
                return DeleteResult;
            })
        }
    })
}
