import {configureStore} from "@reduxjs/toolkit"
import todayPlanListReducer from "./reducers";

const store =configureStore({
    reducer:{
        todayPlan:todayPlanListReducer,
    }
})




export default store;

