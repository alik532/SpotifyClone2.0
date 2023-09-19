import React, {FC} from 'react'
import { ISvg } from '../types'

const MainSVG:FC<ISvg> = ({size, color}) => {
  return (
    <svg role="img" height={size} width={size} fill={color ? color : "black"} aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path></svg>
  )
}

export default MainSVG