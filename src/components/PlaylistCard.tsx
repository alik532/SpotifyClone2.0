import React, {FC} from 'react'
import classes from '../styles/components/PlaylistCard.module.css'
import { PlaySVG, ResumeSVG } from '../assets';
import { useActions, useAppSelector } from '../hooks';
import { useGetTracksQuery } from '../api/api';

interface IPlaylistCard {
  id: string
  name: string;
  desc:string;
  img:string;
}

const PlaylistCard:FC<IPlaylistCard> = ({name, desc, img, id}) => {

  const currentTrackId = useAppSelector(state => state.trackQueue.currentTrackId)
  const isPlaying = useAppSelector(state => state.trackQueue.isPlaying)
  const {data} = useGetTracksQuery({id: currentTrackId})

  const { toggleTrack } = useActions()

  return (
    <div className={classes.card}>
        <img src={img} alt="" className={classes.img}/>
        <h3 className={classes.name}>{name}</h3>
        <h5 className={classes.desc}>{desc}</h5>
        <button className={classes.playButton} onClick={(e) => {e.preventDefault();toggleTrack(!isPlaying)}}>
          {(isPlaying && data?.tracks[0].album.name === name) ? <ResumeSVG size={16}/> : <PlaySVG size={16}/>}
        </button>
    </div>
  )
}

export default PlaylistCard