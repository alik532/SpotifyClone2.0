import React, {FC} from 'react'
import classes from '../styles/components/PlaylistItem.module.css'
import { useAppSelector } from '../hooks'
import { Link } from 'react-router-dom'

interface IPlaylistItem {
	id: string,
	name: string,
	img: string,
}

const PlaylistItem:FC<IPlaylistItem> = ({id, name, img}) => {

	const isSidebarExpanded = useAppSelector(state => state.userPreferences.sideBarExpanded)

	return (
		<Link to={`/playlist/${id}`}>
			<div className={classes.item}>
				<img src={img} alt="" className={classes.img}/>
				<div className={classes.info} style={{display: isSidebarExpanded ? "flex" : "none"}}>
					<h4 className={classes.name}>{name}</h4>
					<h6 className={classes.desc}>Плейлист</h6>
				</div>
			</div>
		</Link>
	)
}

export default PlaylistItem