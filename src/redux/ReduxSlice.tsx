import { createSlice } from "@reduxjs/toolkit";

// Redux Initial States
const initialState = {
    user_id: null,
    toast: {
        type: "",
        message: ""
    },
    stepCompletedState: {},
    connectorGetAllState: {},
    attributes_mapping: {},
};

const reduxSlice = createSlice({
    name: "redux",
    initialState,
    reducers: {
        // Action For UserId
        userId: (state, action) => {
            state.user_id = action.payload;
        },
        showToast: (state, action) => {
            const { type, message } = action.payload
            state.toast.type = type;
            state.toast.message = message
        },
        hideToast: (state) => {
            state.toast.type = "";
            state.toast.message = ""
        },
        stepCompleted: (state, action) => {
            state.stepCompletedState = {
                ...state.stepCompletedState,
                ...action.payload
            }
        },
        connectorGetMethod: (state, action) => {
            state.connectorGetAllState = {
                ...state.connectorGetAllState,
                ...action.payload
            }
        },
        attributesMappingMethod: (state, action) => {
            state.attributes_mapping = {
                ...state.attributes_mapping,
                ...action.payload
            }
        },

    },
});
// Export Actions
export const { userId, showToast, hideToast, stepCompleted, connectorGetMethod, attributesMappingMethod } =
    reduxSlice.actions;

export default reduxSlice.reducer;