import React, {FC} from 'react'
import classes from '../styles/components/Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { useState, useEffect } from 'react'
import { ProfileSVG } from '../assets'

const Header:FC = () => {

	const [scrollPos, setScrollPos] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
		  const scrollPosition = window.scrollY;
		  setScrollPos(scrollPosition)
		};
	
		window.addEventListener('scroll', handleScroll);
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);

	const color = useAppSelector((state) => state.userPreferences.headerColor)
	const navigate = useNavigate()

	return (
		<div className={classes.header} >
			<div className={classes.nav}>
				<div onClick={() => navigate(-1)} className={classes.button}>{"<"}</div>
				<div onClick={() => navigate(+1)} className={classes.button}>{">"}</div>
			</div>
			<div className={classes.prof} >
				<ProfileSVG size={18} color='white'/>
			</div>
			<div className={classes.color} style={{backgroundColor: color, opacity: scrollPos / (window.innerHeight)}}></div>
		</div>
	)
}

export default Header