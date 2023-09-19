import React, {FC} from 'react'
import classes from '../styles/pages/LibraryPage.module.css'
import { MenuSVG, PlaySVG } from '../assets'
import { useAppSelector } from '../hooks'
import { useGetTracksQuery } from '../api/api'
import { getTotalDurationOfTracks, getformatDuration } from '../helpers/formattedTime'
import TrackItem from '../components/TrackItem'

const LibraryPage:FC = () => {

	const tracksIds = useAppSelector(state => state.liked.songs)
	const currentTrackId = useAppSelector(state => state.trackQueue.currentTrackId)
	const {data, isLoading} = useGetTracksQuery({id: tracksIds.join(",")})
	
	if (isLoading) {
		return <h1>Loading</h1>
	}
	else
		return (
			<div className={classes.page}>
				<div className={classes.gradient} style={{background: `linear-gradient(180deg, #5038a098 10%, #5038a002 100%)` }}></div>
				<div className={classes.headerGradient} style={{background: `linear-gradient(180deg, #5038a098 0%, #5038a020 90%)` }}></div>
				<div className={classes.header} >
						<img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="" className={classes.headerImg} />
						<div className={classes.headerInfo}>
							Liked tracks
							<h1 className={classes.playlistName}>Любимые треки</h1>
							<div className={classes.data}>
								<h4 className={classes.paylistArtists}>Username</h4>
								<h4 className={classes.total}>{data ? data.tracks.length : 0} songs {' ->'}</h4>
								<h4 className={classes.duration}>{getformatDuration(getTotalDurationOfTracks(data ? data.tracks : []))}</h4>
							</div>
						</div>
					</div>
					<div className={classes.controls}>
						<div className={classes.playButton}>
							<PlaySVG color='black' size={20}/>
						</div>
						<MenuSVG color='gainsboro' size={35}/>
					</div>
					<hr />
					<div className={classes.list}>
						{data ? data.tracks.map((track, indx) => 
							<TrackItem key={track.id} isSelected={currentTrackId === track.id} track={track} img={track.album.images[1].url} number={indx+1}/>	
						) : <div className={classes.empty}>
								<h2>Здесь появятся треки, которые вам понравились</h2>
								<button className={classes.find}>НАЙТИ ТРЕКИ</button>
							</div>}
					</div>
			</div>
		)
}

export default LibraryPage