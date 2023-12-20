import React, {FC} from 'react'
import classes from '../styles/pages/Main.module.css'
import PlaylistList from '../components/PlaylistList'
import { useGetPlaylistsQuery } from '../api/api'
import ErrorPage from './ErrorPage'
import { useAppSelector } from '../hooks'

const Main:FC = () => {

  const { data, error, isLoading } = useGetPlaylistsQuery({ids: '3IBcauSj5M2A6lTeffJzdv,4m2880jivSbbyEGAKfITCa,7jPoliCU7TRA13Wro32AOD,3cQO7jp5S9qLBoIVtbkSM1,3cfAM8b8KqJRoIzt3zLKqw,4bTfyrDHiBOV0rEV8EG1ua,6pUg9RDDoVyQQVJ48FkmXz,30WNa86MJsrzTlki1YHI6A,2cWBwpqMsDJC1ZUwz813lo,2Ti79nwTsont5ZHfdxIzAm,7JOCOjZTcLysDMkZGWlcIj,6jKZplJpy21R5lHaYHHjmZ,0SrskI3mHcu5MzKeZNv2f6,4yP0hdKOZPNshxUOjY0cZj,2mumCpGmuE9iDeOvMx6XrB,0h2knr6qpiAq0tV5ri5JMF,1pCA38N6MkLlthXtAOvZTU,6trNtQUgC8cgbWcqoMYkOR,4c2p3TdN7NcQfCXyueCNnC,4otkd9As6YaxxEkIjXPiZ6'})
  const color = useAppSelector((state) => state.userPreferences.headerColor)

  if (error) {
    return <ErrorPage backLink='/' message={JSON.stringify(error)}/>
  }
  if (isLoading) {
    return <div>LOADING</div>
  }

  return data ? (
    <div className={classes.main}>
        <div className={classes.headerGradient} style={{background: `linear-gradient(180deg, ${color}98 10%, ${color}02 100%)` }}></div>
        <PlaylistList albums={data.albums.slice(0, 7)} title='My Awesome Playlist'/>
        <PlaylistList albums={data.albums.slice(7, 12)} title='Playlist of the day'/>
        <PlaylistList albums={data.albums.slice(11, 18)} title='Just for you'/>
        <PlaylistList albums={data.albums.slice(16, 22)} title='Jump back in'/>
    </div>
  ) : (<div>LOADING</div>)
}

export default Main