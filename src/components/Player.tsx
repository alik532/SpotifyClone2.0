import React, {FC} from 'react'
import classes from '../styles/components/Player.module.css'
import { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '../hooks'
import { useGetTracksQuery } from '../api/api'
import { HeartSVG, PlaySVG, NextSVG, QueueSVG, ShuffleSVG, RepeatSVG, VolumeSVG, ResumeSVG, MutedSVG, LikedSVG} from '../assets'
import { useActions } from '../hooks'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { checkIsLiked } from '../reducers/liked'

const Player:FC = () => {

    const id = useAppSelector(state => state.trackQueue.currentTrackId)
    const isPlaying = useAppSelector(state => state.trackQueue.isPlaying)
    const [isRepeating, setIsRepeating] = useState(false)
    const navigate = useNavigate()

    const audioElement = useRef<HTMLAudioElement>(null)
    const volumeBarRef = useRef<HTMLDivElement>(null)
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1)
    const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false)
    const location = useLocation() 
    
    useEffect(() => {
        if (trackData) {
            if (isPlaying) {
                audioElement.current!.play()
            }
            else {
                audioElement.current?.pause()
            }
        }
    },)

    useEffect(() => {
        if (location.pathname === '/queue') {
            setIsQueueOpen(true)
        }
        else {
            setIsQueueOpen(false)
        }
    }, [location.pathname])

    const {toggleTrack, switchToNextTrack, likeTrack } = useActions()
    
    const {data: trackData} = useGetTracksQuery({id})

    const onPlaying = () => {
        const currentTrackTime = audioElement.current?.currentTime
        setCurrentTime(currentTrackTime!)
        setVolume(audioElement.current!.volume)
    }

    const progrssRef = useRef<HTMLDivElement>(null)

    const checkWidth = (e:React.MouseEvent<HTMLDivElement>) => {
        let width = progrssRef.current!.clientWidth
        const offset = e.nativeEvent.offsetX
        audioElement.current!.currentTime = offset / width * 30
    }

    const checkVolumeWidth = (e:React.MouseEvent<HTMLDivElement>) => {
        let width = volumeBarRef.current!.clientWidth
        const offset = e.nativeEvent.offsetX
        audioElement.current!.volume = offset / width
    }

    const mute = () => {
        const isMuted = audioElement.current!.muted
        if (isMuted) {
            audioElement.current!.muted = false
        }
        else {
            audioElement.current!.muted = true
        }
    }

    const handleOnSongEnd = () => {
        switchToNextTrack()
    }

    const likedTracks = useAppSelector(state => state.liked.songs)
    const isLiked = checkIsLiked(id, likedTracks)

    return (
        <div className={classes.container}>
            <div className={classes.player} style={trackData ? {} : {pointerEvents: "none", filter: "blur(1px)"}}>
                    <audio ref={audioElement} src={trackData && trackData.tracks[0].preview_url} autoPlay onEnded={handleOnSongEnd} onTimeUpdate={onPlaying}/>
                    <div className={classes.main}>
                        <img src={trackData && trackData.tracks[0].album.images[2].url} alt="" className={classes.img}/>
                        <div className={classes.names}>
                            <h3 className={classes.trackName}>{trackData && trackData.tracks[0].name}</h3>
                            <div className={classes.artists}>{trackData && trackData.tracks[0].artists.map(artist => <p className={classes.artist}>{artist.name+" "}</p>)}</div>
                        </div>
                        <div className={classes.like} onClick={() => likeTrack(id)}>
                            {isLiked ? <LikedSVG size={18}/> : <HeartSVG size={18}/>}
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.buttons}>
                            <button className={classes.shuffle}><ShuffleSVG size={18}/></button>
                            <button className={classes.previousTrack}><NextSVG size={18}/></button>
                            <button className={classes.play} onClick={() => toggleTrack(!isPlaying)}>{isPlaying ? <ResumeSVG size={16} color='black'/> : <PlaySVG size={16} color='black'/>}</button>
                            <button className={classes.nextTrack} onClick={() => switchToNextTrack()}><NextSVG size={18}/></button>
                            <button className={classes.repeat} onClick={() => setIsRepeating(prev => !prev)} style={isRepeating ? {fill: "#1DB954"} : {}}><RepeatSVG size={18}/></button>
                        </div>
                        <div className={classes.duration}>
                            <p className={classes.currentTime}>{`0:${currentTime.toFixed(0).length === 1 ? "0"+currentTime.toFixed(0) : currentTime.toFixed(0)}`}</p>
                            <div className={classes.progressBar} ref={progrssRef} onClick={e => checkWidth(e)}>
                                <div className={classes.seekBar} style={{width: `${currentTime / 30 * 100}%`}}><div className={classes.point}></div></div>
                            </div>
                            <p className={classes.endTime}>0:30</p>
                        </div>
                    </div>
                    <div className={classes.features}>
                            {!isQueueOpen 
                            ? (<Link to='/queue'>
                                <button style={{fill: "#c0c0c0"}}>
                                    <QueueSVG size={18}/>
                                </button>
                            </Link>)
                            : (<button onClick={() => {navigate(-1)}} style={{fill: "#1DB954"}}>
                                <QueueSVG size={18}/>
                            </button>)}
                        <div className={classes.volume}>
                            <button onClick={mute}>
                                {volume === 0 ? <MutedSVG size={18}/> :<VolumeSVG size={18}/>}
                            </button>
                            <div className={classes.volumeWrapper} onClick={(e) => checkVolumeWidth(e)} ref={volumeBarRef}>
                                <div className={classes.volumeBar}>
                                    <div className={classes.volumeFullness} style={{width: `${volume*100}%`}}><div className={classes.volumePoint}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
            <div className={classes.mobilePlayer}>
            <div className={classes.main}>
                <img src={trackData && trackData.tracks[0].album.images[2].url} alt="" className={classes.img}/>
                <div className={classes.names}>
                    <h3 className={classes.trackName}>{trackData && trackData.tracks[0].name}</h3>
                    <div className={classes.artists}>{trackData && trackData.tracks[0].artists.map(artist => <p className={classes.artist}>{artist.name+" "}</p>)}</div>
                </div>
                <div className={classes.like} onClick={() => likeTrack(id)}>
                    {isLiked ? <LikedSVG size={18}/> : <HeartSVG size={22}/>}
                </div>
                </div>
            </div>
        </div>
    )
    
}

export default Player