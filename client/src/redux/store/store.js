import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state/settings-slice"
import taskReducer from "../state/task-slice"
export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer
    }
})