import { ITrackItem } from "../types";

export function getformatDuration(milliseconds:number):string {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
  
	let timeString = '';
  
	if (hours > 0) {
	  const formattedHours = hours.toString().padStart(2, '0');
	  timeString += `${formattedHours}hour `;
	}
  
	if (minutes > 0 || hours > 0) {
	  const formattedMinutes = minutes.toString().padStart(2, '0');
	  timeString += `${formattedMinutes}min `;
	}
  
	const formattedSeconds = seconds.toString().padStart(2, '0');
	timeString += `${formattedSeconds}sec`;
  
	return timeString;
}

export const getTotalDurationOfTracks = (array: Array<ITrackItem>):number => {
	let total = 0
	array.forEach(track => {
		total += track.duration_ms
	})
	return total
}
  