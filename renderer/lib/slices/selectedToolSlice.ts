import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tool } from "@/lib/types/Tool";

export interface SelectedTool {
    value: Tool
}

const initialState: SelectedTool = {
    value: "select"
}

const selectedToolSlice = createSlice({
    name: "selectedTool",
    initialState,
    reducers: {
        setTool: (state, action: PayloadAction<Tool>) => {
            state.value = action.payload
        }
    }
})

export const { setTool } = selectedToolSlice.actions;
export default selectedToolSlice.reducer;