import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    isOpen: boolean;
}

const initialState : SidebarState = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        switchIsOpen: (state) => {
            state.isOpen = !state.isOpen
        }
    },
});

export const { switchIsOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;