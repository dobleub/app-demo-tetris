interface IAction {
	type: string,
	payload: any
}
interface ITetromino {
    shape: (string | number)[][];
    color: string;
}
interface ITetrominos {
	0: ITetromino,
	I: ITetromino,
	J: ITetromino,
	L: ITetromino,
	O: ITetromino,
	S: ITetromino,
	T: ITetromino,
	Z: ITetromino
}
interface IPos {
	x: number, 
	y: number
}
interface IPlayer {
	pos: IPos,
	tetromino?: (string | number)[][],
	collided?: boolean
}
type IStage = Array<Array<[number, string]>>;

export {
	IAction,
	ITetromino,
	ITetrominos,
	IPos,
	IPlayer,
	IStage
}