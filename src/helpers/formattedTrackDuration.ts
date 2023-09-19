export function formattedTrackDuration(milliseconds: number): string {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
  
	const formattedSeconds = seconds % 60;
	const formattedMinutes = minutes % 10;
  
	const durationParts: string[] = [];
  
	if (formattedMinutes > 0) {
	 	durationParts.push(`${formattedMinutes}`);
	}
	else {
		durationParts.push(`0`);
	}
  
	if (formattedSeconds > 0) {
	  durationParts.push(`${formattedSeconds}`);
	}
  
	return durationParts.join(':');
}