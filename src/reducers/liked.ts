import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ILiked {
	songs: Array<string | void>,
	albums: Array<string | void>,
}

const initialState: ILiked = {
	songs: [],
	albums: [],
}

export const likedSlice = createSlice({
	name: "liked",
	initialState,
	reducers: {
		likeTrack: (state, action: PayloadAction<string>) => {
			if (state.songs.includes(action.payload)) 
				state.songs = state.songs.filter(song => song !== action.payload)
			else 
				state.songs.push(action.payload)
		},
		likeAlbum: (state, action: PayloadAction<string>) => {
			if (state.albums.includes(action.payload)) 
				state.albums = state.albums.filter(album => album !== action.payload)
			else 
				state.albums.push(action.payload)
		}
	},
})

export const {likeTrack, likeAlbum } = likedSlice.actions

export const selectLikedSongs = (state: Array<string | void>) => state
export const selectLikedAlbums = (state: ILiked) => state.albums

export const checkIsLiked = (id: string, likedList: Array<string | void>) => {
	return likedList.includes(id)
};  

export default likedSlice.reducer

