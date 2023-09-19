import React, {FC, useState} from 'react'
import classes from '../styles/components/SearchTrackItem.module.css'
import { IImg } from '../types'
import {HeartSVG, ResumeSVG, PlaySVG, MusicSVG, MenuSVG, LikedSVG } from '../assets'
import { formattedTrackDuration } from '../helpers/formattedTrackDuration'
import Menu from './Menu'
import { useActions } from '../hooks'
import { checkIsLiked } from '../reducers/liked'
import { useAppSelector } from '../hooks'

interface ISearchTrackItem {
	track: {
		id: string,
		name: string,
		albumOfTrack: {
			id: string,
			name: string,
			coverArt: {
				sources: Array<IImg>
			}
		},
		artists: {
			items: Array<{
				profile: {name: string}
			}>
		},
		duration: {
			totalMilliseconds: number,
		}
	},
	number: number,
	isSelected: boolean
}

const SearchTrackItem:FC<ISearchTrackItem> = ({track, number, isSelected}) => {

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

	const handleOpenMenu = (e:React.MouseEvent<HTMLDivElement>) => {
		const { pageY } = e 
		setContextMenu({isShown: true, y: pageY})
	}

	const play = () => {
		playTrack(track.id)
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
					<img src={track.albumOfTrack.coverArt.sources[1].url} alt="" className={classes.img}/>
					<div className={classes.main}>
						<div className={classes.name}>{track.name}</div>
						<div className={classes.artist}>{track.artists.items.map(artist => <div key={artist.profile.name}>{artist.profile.name}</div>)}</div>
					</div>
				</div>
				<div className={classes.second}>
					<div className={classes.heart} style={isLiked ? {display: "initial"} : {}} onClick={() => likeTrack(track.id)}>
						{isLiked ? <LikedSVG size={18}/> : <HeartSVG size={18} color='gainsboro'/>}
					</div>
					<div className={classes.duration}>{formattedTrackDuration(track.duration.totalMilliseconds)}</div>
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

export default SearchTrackItem