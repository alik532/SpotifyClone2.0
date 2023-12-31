import React, {FC} from 'react'
import { ISvg } from '../types'

const ArrowSVG:FC<ISvg> = ({color, size}) => {
  return (
	<svg role="img" height={size} width={size} fill={color} aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" ><path d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"></path></svg>
  )
}

export default ArrowSVG