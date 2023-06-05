import { configureStore } from "@reduxjs/toolkit";
import ReduxSlice from "./ReduxSlice";
// Store
const store = configureStore({
    reducer: {
        redux: ReduxSlice,
    },
});

export default store;