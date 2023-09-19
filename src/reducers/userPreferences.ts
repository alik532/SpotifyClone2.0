import { getRndColor } from "../data/colors"
import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
	headerColor?: string;
    sideBarExpanded?: boolean;
}

const initialState: IInitialState = {
	headerColor: getRndColor(),
	sideBarExpanded: true,
}

export const userPreferencesSlice = createSlice({
	name: "header",
	initialState,
	reducers: {
		changeHeaderColor: (state, action) => {
			state.headerColor = action.payload
		},
		toggleSidebar: (state, action) => {
			state.sideBarExpanded = !state.sideBarExpanded
		}
	},
})

export const { changeHeaderColor, toggleSidebar } = userPreferencesSlice.actions

export const selectHeaderColor = (state: IInitialState) => state.headerColor
export const selectSidebarStatus = (state: IInitialState) => state.sideBarExpanded

export default userPreferencesSlice.reducer