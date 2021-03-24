import { IPlayer, IStage, IPos } from '../interfaces';

/*
 * Constants
 */
export const STAGE_WIDTH:number = 12;
export const STAGE_HEIGHT:number = 20;

/*
 * Custom methods
 */
export const createStage:IStage = () => {
	return Array.from( Array(STAGE_HEIGHT), () =>
		new Array(STAGE_WIDTH).fill([0, 'clear'])
	);
}

export const checkCollision = (player:IPlayer, stage:IStage, {x: moveX, y: moveY}:IPos):boolean => {
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
		// 1. Check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0) {
				if (
					// 2. Check that our move is inside the game areas height (y)
					// We shouldn't go through the bottom of the play area
					!stage[y + player.pos.y + moveY] ||
					// 3. Check that our move is inside the game areas width (x)
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					// 4. Check that the cell wer'e moving to isn't set to clear
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				) {
					return true;
				}
			}
		}
	}
}

/*
 * Custom styles
 */
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
