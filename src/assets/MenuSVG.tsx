import React, {FC} from 'react'
import { ISvg } from '../types'

const MenuSVG:FC<ISvg> = ({color, size}) => {
  return (
	  <svg role="img" height={size} width={size} aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill={color}><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
  )
}

export default MenuSVG