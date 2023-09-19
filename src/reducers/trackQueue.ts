import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ITrackQueue {
    queue: Array<string>,
    currentTrackId: string,
    isPlaying: boolean,
}

const initialState: ITrackQueue = {
    queue: [],
    currentTrackId: "",
    isPlaying: true,
}

export const trackQueueSlice = createSlice({
    name: 'trackQueue',
    initialState,
    reducers: {
        addTrackToQueue: (state, action: PayloadAction<string>) => {
          
            if (state.queue.length === 0 && state.currentTrackId === undefined) {
                state.currentTrackId = action.payload
            }
            else if (state.queue.length === 0 && state.currentTrackId) {
                state.queue = [action.payload]
            }
            else {
                state.queue.push(action.payload)
            }
        },
        addAlbumToQueue: (state, action:PayloadAction<Array<string>>) => {
            state.queue.push(...action.payload)
        },
        playTrack: (state, action: PayloadAction<string>) => {
            state.currentTrackId = action.payload
        },
        switchToNextTrack: (state) => {
            if (state.queue.length > 0) {
                state.currentTrackId = state.queue[0]
                state.queue.shift()
            }
            else {
                state.currentTrackId = ""
            }
        },
        toggleTrack: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        }
    }
})


export const { addTrackToQueue, switchToNextTrack, toggleTrack, playTrack, addAlbumToQueue } = trackQueueSlice.actions

export const selectCurrentTrack = (state: ITrackQueue) => state.currentTrackId
export const selectTrackQueue = (state: ITrackQueue) => state.queue
export const selectIsPlaying = (state: ITrackQueue) => state.isPlaying

export default trackQueueSlice.reducer

