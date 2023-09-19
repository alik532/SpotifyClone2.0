import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { useMemo } from 'react'
import { addTrackToQueue, switchToNextTrack, toggleTrack, playTrack } from './reducers/trackQueue'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { changeHeaderColor, toggleSidebar } from './reducers/userPreferences'
import { RootState } from './store/store'
import { likeAlbum, likeTrack } from './reducers/liked'
import { addAlbumToQueue } from './reducers/trackQueue'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const rootActions = {
    addTrackToQueue,
    switchToNextTrack,
    changeHeaderColor,
    toggleSidebar,
    toggleTrack,
    playTrack,
    likeAlbum,
    likeTrack,
    addAlbumToQueue,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}