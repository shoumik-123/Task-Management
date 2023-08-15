import {createSlice} from "@reduxjs/toolkit";

export const profilSlice = createSlice({
    name:'profile',
    initialState:{
        value : []
    },
    reducers:{
        SetProfile :(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {SetProfile} = profilSlice.actions;
export default profilSlice.reducer;