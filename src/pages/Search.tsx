import React, {ChangeEvent, FC, useState} from 'react'
import classes from '../styles/pages/Search.module.css'
import { useSearchTracksQuery } from '../api/api'
import SearchTrackItem from '../components/SearchTrackItem'
import { useAppSelector } from '../hooks'

const Search:FC = () => {

  const [value, setValue] = useState<string>("")

  const {data} = useSearchTracksQuery({q: value})

  const currentTrackId = useAppSelector(state => state.trackQueue.currentTrackId)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  if (!data) 
    return <h1>Loading</h1>
  return (
    <div className={classes.page}>
      <input type="text" className={classes.input} value={value} autoFocus placeholder='What do you want to listen?' onChange={(e) => handleChange(e)}/>
      {data.tracks && <div className={classes.resultList}>
          {data.tracks.items.map((track, indx) => 
           <SearchTrackItem key={track.data.id} track={track.data} number={indx + 1} isSelected={currentTrackId === track.data.id}/>
          )}
        </div>}
    </div>
  )
}

export default Search