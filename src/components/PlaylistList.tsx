import React, {FC} from 'react'
import PlaylistCard from './PlaylistCard'
import classes from '../styles/components/PlaylistList.module.css'
import { IAlbum } from '../types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAppSelector } from '../hooks'

interface IPlaylistList {
  title: string
  albums: IAlbum[],
}

const PlaylistList:FC<IPlaylistList> = ({title, albums}) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  const isSidebarExpanded = useAppSelector(state => state.userPreferences.sideBarExpanded)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className={classes.container}>
      <div className={classes.header} style={{width: `${windowWidth-440}px`}}>
        <h2 className={classes.title}>{title}</h2>
        {windowWidth < 1890 && <div className={classes.show} onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? "Show less" : "Show More"}</div>}
      </div>
        <div className={classes.list} style={{flexWrap: isExpanded ? "wrap" : "nowrap"}}>
        {albums.slice(0, isExpanded ? 999 : Math.floor((windowWidth-480) / (isSidebarExpanded ? 190 : 160))).map(playlist => (<Link key={playlist.id} to={`/playlist/${playlist.id}`}>
          <PlaylistCard key={playlist.id} id={playlist.id} name={playlist.name} desc={playlist.label} img={playlist.images[1].url}/>
        </Link>))}
        </div>
        <div className={classes.listMobile}>
          {albums.map(playlist => (<Link key={playlist.id} to={`/playlist/${playlist.id}`}>
            <PlaylistCard key={playlist.id} id={playlist.id} name={playlist.name} desc={playlist.label} img={playlist.images[1].url}/>
          </Link>))}
        </div>
    </div>
  )
}

export default PlaylistList