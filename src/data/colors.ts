const colors: Array<string> = [
	'#016795',
	'#2384E0',
	'#FFC107',
	'#F44336',
	'#D81B60',
	'#AED581',
	'#607D8B',
	'#9E9E9E',
	'#FFFFFF',
	'#00BCD4',
	'#009688',
	'#4CAF50',
	'#8BC34A',
	'#CDDC39',
	'#FFEB3B',
	'#FFCC80',
	'#FFAB91',
]

export const getRndColor = () => colors[Math.floor(Math.random()*colors.length)]

