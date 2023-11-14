import {createSlice} from "@reduxjs/toolkit"

// we have to define an initial state 
const initialState={
    todayPlanList: [],
    idCounter: 0,
}


// I will need to create my slice here 
const todayPlanListSlice = createSlice({
    name:'todayPlan',
    initialState,
    reducers:{
        addToTodayPlanList:(state,action)=>{
            const {planfortoday}=action.payload;
            const id = state.idCounter++;
            // Timestamp when the item is added
            const time = Date.now();
            // pushing al these items into the empty array 
            state.todayPlanList.push({
                id,
                planfortoday,
                time,
            }); // Return the generated id
        },
        removeItemFromTodayPlanList: (state, action) => {
            const planToRemoveId = action.payload;
            state.todayPlanList = state.todayPlanList.filter((item) => item.id !== planToRemoveId);
        },        
    }
})



export const {addToTodayPlanList,  removeItemFromTodayPlanList}=todayPlanListSlice.actions;
export default todayPlanListSlice.reducer;