import React, {FC} from 'react'
import classes from '../styles/components/SIdeBar.module.css'
import { Link } from 'react-router-dom'
import { useActions } from '../hooks'
import { useAppSelector } from '../hooks'
import { MainSVG, LibrarySVG, SearchSVG, ArrowSVG } from '../assets'
import { useLocation } from 'react-router-dom'
import { useGetPlaylistsQuery } from '../api/api'
import PlaylistItem from './PlaylistItem'

const SideBar:FC = () => {
  
  const location = useLocation()
  const { toggleSidebar,  } = useActions()
  const isSidebarExpanded = useAppSelector(state => state.userPreferences.sideBarExpanded)
  const likedAlbumIds = useAppSelector(state => state.liked.albums)

  const {data} = useGetPlaylistsQuery({ids: likedAlbumIds.join(",")})

  return (
    <div className={classes.sidebar} style={isSidebarExpanded ? {maxWidth: "20vw"} : {paddingTop: '65px', width: "20px", flexGrow: "0"}}>
      <Link to='/'>
        <div className={classes.button} >
          <MainSVG size={22} color={location.pathname === '/' ? 'white' : 'rgb(206, 206, 206)'} />
          {isSidebarExpanded && <h4 id={classes.button} style={{color: location.pathname === '/' ? 'white' : 'rgb(206, 206, 206)'}}>Главная</h4>}
        </div>
      </Link>
      <Link to='/search'>
        <div className={classes.button}>
          <SearchSVG size={22} color={location.pathname === '/search' ? 'white' : 'rgb(206, 206, 206)'}/>
          {isSidebarExpanded && <h4 id={classes.button} style={{color: location.pathname === '/search' ? 'white' : 'rgb(206, 206, 206)'}}>Поиск</h4>}
        </div>
      </Link>
      <div className={classes.toggle} onClick={toggleSidebar}>
        {isSidebarExpanded 
          ? <div className={classes.arrowClose}><ArrowSVG size={17} color='white'/></div> 
          : <div className={classes.arrowOpen}><ArrowSVG size={17} color='white'/></div>}
      </div>
      <hr className={classes.line} />
      <div className={classes.library}>
        <div className={classes.header}>
          <Link to='/library'>
            <div className={classes.button}>
              <LibrarySVG size={22} color={location.pathname === '/library' ? 'white' : 'rgb(206, 206, 206)'}/>
              {isSidebarExpanded && <h4 id={classes.button} style={{color: location.pathname === '/search' ? 'white' : 'rgb(206, 206, 206)'}}>Моя Медиатека</h4>}
            </div>
          </Link>
        </div>
        <div className={classes.list}>
          {data && data.albums.map(album => 
            <PlaylistItem id={album.id} name={album.name} img={album.images[1].url}/>  
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar