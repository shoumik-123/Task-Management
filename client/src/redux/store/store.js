import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state/settings-slice"
import taskReducer from "../state/task-slice"
import summaryReducer from "../state/summary-slice"
export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summary : summaryReducer
    }
})