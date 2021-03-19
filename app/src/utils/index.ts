export const STAGE_WIDTH:number = 12;
export const STAGE_HEIGHT:number = 20;

export const createStage = () => {
	return Array.from( Array(STAGE_HEIGHT), () =>
		new Array(STAGE_WIDTH).fill([0, 'clear'])
	);
}

export const setCellStyles = (type:number|string, colorStr:string) => ({
	width: 'auto',
	background: `rgba(${colorStr}, 0.8)`,
	border: (type === 0 ? '0px solid' : '4px solid'),
	borderBottomColor: `rgba(${colorStr}, 0.1)`,
	borderRightColor: `rgba(${colorStr}, 1)`,
	borderTopColor: `rgba(${colorStr}, 1)`,
	borderLeftColor: `rgba(${colorStr}, 0.3)`
});

export const setDisplayStyles = (gameOver:boolean) => ({
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center', 
	margin: '0 0 20px 0',
	padding: '20px',
	border: '4px solid #333',
	minHeight: '30px',
	width: '100%',
	borderRadius: '20px',
	color: (gameOver ? 'red' : '#999'),
	background: '#000',
	fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
	fontSize: '0.8rem'
});

export const setStageStyles = (height:number, width:number) => ({
	display: 'grid',
	gridTemplateRows: `repeat(${height}, calc(25vw / ${width}) )`,
	gridTemplateColumns: `repeat(${width}, 1fr)`,
	gridGap: '1px',
	border: '2px solid #333',
	width: '100%',
	maxWidth: '25vw',
	background: '#111',
});