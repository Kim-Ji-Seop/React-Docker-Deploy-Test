import { createSlice } from "@reduxjs/toolkit";

const initalStateValue = {
    orderIdx: null
}

export const printSlice = createSlice({
    name: 'print',
    initialState: { value: initalStateValue },
    reducers: {
        SET_PRINT: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { SET_PRINT } = printSlice.actions;
export default printSlice.reducer;