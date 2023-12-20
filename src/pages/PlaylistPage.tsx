import React, {FC, useState } from 'react'
import classes from '../styles/pages/PlaylistPage.module.css'
import { Link } from 'react-router-dom'
import TrackItem from '../components/TrackItem'
import { useParams } from 'react-router-dom'
import { useGetPlaylistQuery, useGetPlaylistMetadataQuery } from '../api/api'
import { useActions, useAppSelector } from '../hooks'
import { getTotalDurationOfTracks, getformatDuration } from '../helpers/formattedTime'
import { PlaySVG, HeartSVG, MenuSVG, LikedSVG } from '../assets/index'
import { checkIsLiked } from '../reducers/liked'
import Menu from '../components/Menu'

const PlaylistPage: FC = () => {

	const { id } = useParams()

	const initialContextMenu = {
		isShown: false,
		y: 0,
	}

	const [contextMenu, setContextMenu] = useState(initialContextMenu)

	const likedAlbums = useAppSelector(state => state.liked.albums)
	const currentTrackId = useAppSelector(state => state.trackQueue.currentTrackId)
	const color = useAppSelector((state) => state.userPreferences.headerColor)

	const {data: metaData, isError: isMetaDateErr } = useGetPlaylistMetadataQuery({id})
	const {data, isLoading, isError: isDataErr } = useGetPlaylistQuery({id})
	
	const {changeHeaderColor, likeAlbum, addAlbumToQueue} = useActions()

	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (isDataErr || isMetaDateErr) {
		return <h1>Error</h1>
	}

	const album = data!.albums[0]
	const isLiked = checkIsLiked(album.id, likedAlbums)

	const menuOptions = [
		{label: "Add to queue", function: ()=>addAlbumToQueue([...album.tracks.items.map(track => track.id)])},
		{label: isLiked ? "Remove from liked songs" : "Add to liked songs", function: ()=>{likeAlbum(album.id)}},
		{label: "Share", function: ()=>{}},
	]

	const handleOpenMenu = (e:React.MouseEvent<HTMLButtonElement>) => {
		const { pageY } = e 
		setContextMenu({isShown: true, y: pageY})
	}
	
	if (data && metaData) {
		changeHeaderColor(metaData?.data.album.coverArt.extractedColors.colorRaw.hex)
	}
	
	return  (<div className={classes.page}>
			<div className={classes.gradient} style={{background: `linear-gradient(180deg, ${color}98 10%, ${color}02 100%)` }}></div>
			<div className={classes.headerGradient} style={{background: `linear-gradient(180deg, ${color}98 0%, ${color}20 90%)` }}></div>
			<div className={classes.header} >
				<img src={album.images[0].url} alt="" className={classes.headerImg} />
				<div className={classes.headerInfo}>
					Album
					<h1 className={classes.playlistName}>{album.name}</h1>
					<div className={classes.data}>
						<h4 className={classes.paylistArtists}>{album.artists.map(artist => <Link to='/' key={artist.id}>{artist.name+" "}</Link>)}</h4>
						<h4 className={classes.releaseDate}>{album.release_date.slice(0, 4)}</h4>
						<h4 className={classes.total}>{album.tracks.total} songs {' ->'}</h4>
						<h4 className={classes.duration}>{getformatDuration(getTotalDurationOfTracks(album.tracks.items))}</h4>
					</div>
				</div>
			</div>
			<div className={classes.controls}>
				<div className={classes.playButton}>
					<PlaySVG color='black' size={20}/>
				</div>
				<button className={classes.likeButton} onClick={() => likeAlbum(album.id)}>
					{isLiked ? <LikedSVG size={35}/> : <HeartSVG size={35}/>}
				</button>
				<button className={classes.menuButton} onClick={(e) => handleOpenMenu(e)}>
					<MenuSVG size={35}/>
				</button>
			</div>
			<hr />
			<div className={classes.list}>
				{album.tracks.items.map((track, indx) => 
					<TrackItem key={track.id} isSelected={currentTrackId === track.id} track={track} img={album.images[0].url} number={indx+1}/>	
				)}
			</div>
			<div className={classes.ctx}  style={{top: `${contextMenu.y}px`, left: "200px"}}>
				{contextMenu.isShown && <Menu options={menuOptions} y={contextMenu.y} closeMenu={() => setContextMenu(initialContextMenu)}/>}
			</div>
		</div>)
}

export default PlaylistPage;