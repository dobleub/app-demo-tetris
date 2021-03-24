import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetrominos } from '../utils/tetrominos';
import { STAGE_WIDTH, checkCollision } from '../utils';

import { IPlayer, IPos, IStage } from '../interfaces';

export const usePlayer = () => {
	const [player, setPlayer] = useState<IPlayer>({
		pos: {
			x: 0, 
			y: 0
		},
		tetromino: TETROMINOS[0].shape,
		collided: false
	});

	const rotate = (matrix:(string | number)[][], dir:number) => {
		// Make the rows to become cols (transpose)
		const rotatedTetro:(string | number)[][] = matrix.map((_, index) =>
			matrix.map(col => col[index]),
		);
		// Reverse each row to get a rotated matrix
		if (dir > 0) return rotatedTetro.map(row => row.reverse());
		return rotatedTetro.reverse();
	};

	const playerRotate = (stage:IStage, dir:number) => {
		const clonedPlayer:IPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

		const pos:number = clonedPlayer.pos.x;
		let offset:number = 1;

		while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > clonedPlayer.tetromino[0].length) {
				rotate(clonedPlayer.tetromino, -dir);
				clonedPlayer.pos.x = pos;
				return;
			}
		}
		setPlayer(clonedPlayer);
	};

	const updatePlayerPosition = ({x, y, collided}:IPlayer) => {
		setPlayer((prev) => ({
			...prev,
			pos: {
				x: (prev.pos.x += x),
				y: (prev.pos.y += y)
			},
			collided
		}));
	}

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: {
				x: (STAGE_WIDTH / 2 - 2),
				y: 0
			},
			tetromino: randomTetrominos().shape,
			collided: false
		});
	}, []);

	return [player, updatePlayerPosition, resetPlayer, playerRotate];
};
