import { createSlice } from "@reduxjs/toolkit";
// Redux Initial States
const initialState = {
    user_id: null,
};

const reduxSlice = createSlice({
    name: "redux",
    initialState,
    reducers: {
        // Action For UserId
        userId: (state, action) => {
            state.user_id = action.payload;
        },

    },
});
// Export Actions
export const { userId } =
    reduxSlice.actions;

export default reduxSlice.reducer;