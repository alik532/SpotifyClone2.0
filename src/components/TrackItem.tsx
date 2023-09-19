import React, {FC, useState} from 'react'
import classes from '../styles/components/TrackItem.module.css'
import { ITrackItem } from '../types'
import {formattedTrackDuration} from '../helpers/formattedTrackDuration'
import { HeartSVG, PlaySVG, MusicSVG, ResumeSVG, MenuSVG, LikedSVG } from '../assets'
import { useActions, useAppSelector } from '../hooks'
import Menu from './Menu'
import { checkIsLiked } from '../reducers/liked'

interface ITrackItemData {
	track: ITrackItem
	number: number
	img: string
	isSelected: boolean
}

const TrackItem:FC<ITrackItemData> = ({track, number, img, isSelected}) => {

	const initialContextMenu = {
		isShown: false,
		y: 0,
	}

	const likedTracks = useAppSelector(state => state.liked.songs)
	const isPlaying = useAppSelector(state => state.trackQueue.isPlaying)
	const isLiked = checkIsLiked(track.id, likedTracks)

	const menuOptions = [
			{label: "Add to queue", function: ()=>{addTrackToQueue(track.id)}},
			{label: isLiked ? "Remove from liked songs" : "Add to liked songs", function: ()=>{likeTrack(track.id)}},
			{label: "Share", function: ()=>{}},
		]

	const {addTrackToQueue, playTrack, toggleTrack, likeTrack } = useActions()
	const [contextMenu, setContextMenu] = useState(initialContextMenu)

	
	
	
	const play = () => {
		playTrack(track.id)
	}	
	

	const handleOpenMenu = (e:React.MouseEvent<HTMLDivElement>) => {
		const { pageY } = e 
		setContextMenu({isShown: true, y: pageY})
	}

	return (
		<div className={classes.item} style={{color: isSelected ? "#1DB954" : 'white'}}>
			<div className={classes.first}>
				<div className={classes.number}>
					<div className={classes.num}>
						{(isSelected && isPlaying) ? <MusicSVG /> : number}
					</div>
					<div className={classes.play} onClick={isSelected ? () => toggleTrack(!isPlaying) : play}>
						{isSelected && isPlaying ? <ResumeSVG size={13} color='white'/> : <PlaySVG size={13} color='white'/>}
					</div>
				</div>
				<img src={img} alt="" className={classes.img}/>
				<div className={classes.main}>
					<div className={classes.name}>{track.name}</div>
					<div className={classes.artist}>{track.artists.map(artist => <div key={artist.id}>{artist.name}</div>)}</div>
				</div>
			</div>
			<div className={classes.second}>
				<div className={classes.heart} style={isLiked ? {display: "initial"} : {}} onClick={() => likeTrack(track.id)}>
					{isLiked ? <LikedSVG size={18}/> : <HeartSVG size={18} color='gainsboro'/>}
				</div>
				<div className={classes.duration}>{formattedTrackDuration(track.duration_ms)}</div>
				<div className={classes.menu} onClick={(e) => handleOpenMenu(e)}>
					<div className={classes.menuIcon}>
						<MenuSVG size={20} color='white'/>
					</div>
				</div>
			</div>
			<div className={classes.ctx}  style={{top: `${contextMenu.y}px`, right: "50px"}}>
				{contextMenu.isShown && <Menu options={menuOptions} y={contextMenu.y} closeMenu={() => setContextMenu(initialContextMenu)}/>}
			</div>
		</div>
	)
}

export default TrackItem