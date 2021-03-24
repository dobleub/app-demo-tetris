import React, { useState } from 'react';

import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

import { createStage, checkCollision } from '../../utils';
import { useGameStatus } from '../../hooks/useGameStatus';
import { useInterval } from '../../hooks/useInterval';
import { useStage } from '../../hooks/useStage';
import { usePlayer } from '../../hooks/usePlayer';

import { IPlayer, IStage } from '../../interfaces';

import bg from '../../assets/imgs/bg.png';
import styles from './styles.module.scss';

const Tetris = ():JSX.Element => {
	const [dropTime, setDropTime] = useState<number>(null);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel]  = useGameStatus(rowsCleared);

	console.log('re-render');

	const movePlayer = (position:number) => {
		if (!checkCollision(player, stage, {x: position, y: 0})) {
			updatePlayerPosition({x: position, y: 0});
		}
	}
	const startGame = () => {
		// Reset everything
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	}
	const drop = () => {
		// Increse level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			setLevel((prev) => prev + 1);
			setDropTime(1000 / (level + 1) + 200);
		}

		if (!checkCollision(player, stage, {x: 0, y:1})) {
			updatePlayerPosition({x: 0, y: 1, collided: false});
		} else {
			if (player.pos.y < 1) {
				console.log("GAME OVER!!!");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPosition({x: 0, y: 0, collided: true});
		}
	}
	const keyUp = ({ keyCode }:React.Event<HTMLElement>) => {
		if (!gameOver) {
			if (keyCode === 40) {
				console.log('Interval on');
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	}
	const dropPlayer = () => {
		console.log('Interval off');
		setDropTime(null);
		drop();
	}
	const move = ({ keyCode }:React.Event<HTMLElement>) => {
		if (!gameOver) {
			if (keyCode === 37) {	 			// 37 Left arrow
				movePlayer(-1);
			} else if (keyCode === 39) {		// 39 Right arrow
				movePlayer(1);
			} else if (keyCode === 40) {		// 40 Down arrow
				dropPlayer();
			} else if (keyCode === 38) {
				playerRotate(stage, 1);
			}
		}
	}

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<div 
			className={styles.TetrisWrapper} 
			style={{background: 'url('+bg+')', backgroundSize: 'cover'}}
			role="button"
			tabIndex="0"
			onKeyDown={(e) => move(e)}
			onKeyUp={(e) => keyUp(e)}
		>
			<div className={styles.Tetris}>
				<Stage stage={stage} />
				<aside>
					{
						gameOver ?
							<Display gameOver={gameOver} text="Game Over" />
						:
							<div>
					    		<Display text={`Score: ${score}`} />
					    		<Display text={`Rows: ${rows}`} />
					    		<Display text={`level: ${level}`} />
							</div>

					}
					<StartButton callback={startGame} />
				</aside>
			</div>	
		</div>	
	);
};

export default Tetris;
