import React from 'react'
import { FC } from 'react'
import classes from '../styles/components/Menu.module.css'
import { useClickAway } from '@uidotdev/usehooks'

interface IMenu {
	options: Array<{
		label: string;
		function: Function
	}>,
	closeMenu: Function,
	y: number,
}

const Menu:FC<IMenu> = ({options, closeMenu, y}) => {

	const ref:React.MutableRefObject<HTMLDivElement> = useClickAway(() => closeMenu())

  return (
	<div  ref={ref} className={classes.menu} >
		{options.map(option => 
			<div key={option.label} className={classes.option} onClick={() => {option.function(); closeMenu()}}>{option.label}</div>	
		)}
	</div>
  )
}

export default Menu