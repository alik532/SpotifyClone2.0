import classes from '../styles/pages/QueuePage.module.css'
import { useAppSelector } from '../hooks'
import { useGetTracksQuery } from '../api/api'
import TrackItem from '../components/TrackItem'

const QueuePage = () => {

	const queueId = useAppSelector(state => state.trackQueue.queue)
	const currentTrackId = useAppSelector(state => state.trackQueue.currentTrackId)

	const {data} = useGetTracksQuery({id: [currentTrackId, ...queueId].join(",")})

	
	return (
		<div className={classes.page}>
			<h1>Queue</h1>
			<h3 className={classes.txt}>Qurrently playing</h3>
			{data ? <TrackItem number={1} track={data.tracks[0]} img={data.tracks[0].album.images[1].url} isSelected={true}/> : <h5 className={classes.message}>Треки в очереди отабразятся здесь</h5>}
			<h3 className={classes.txt}>Next in queue</h3>
			{data ? data.tracks.slice(1, data.tracks.length).map((track, indx) => 
				<TrackItem number={indx+1} track={track} img={track.album.images[1].url} isSelected={false}/>	
			) : <h5 className={classes.message}>Треки в очереди отабразятся здесь</h5>}
		</div>
	)
	
}

export default QueuePage