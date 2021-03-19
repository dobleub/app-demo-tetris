import React, { useState } from 'react';

import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

import { createStage } from '../../utils';
import { useStage } from '../../hooks/useStage';
import { usePlayer } from '../../hooks/usePlayer';

import bg from '../../assets/imgs/bg.png';
import styles from './styles.module.scss';

const Tetris = ():JSX.Element => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [player, updatePlayerPosition, resetPlayer] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	const movePlayer = (position:number) => {
		updatePlayerPosition({
			x: position,
			y: 0
		});
	}
	const startGame = () => {
		// Reset everything
		setStage(createStage());
		resetPlayer();
	}
	const drop = () => {
		updatePlayerPosition({x: 0, y: 1, collided: false});
	}
	const dropPlayer = () => {
		drop();
	}
	const move = ({ keyCode }:React.Event<HTMLElement>) => {
		console.log(keyCode);
		if (!gameOver) {
			if (keyCode === 37) {	 			// 37 Left arrow
				movePlayer(-1);
			} else if (keyCode === 39) {		// 39 Right arrow
				movePlayer(1);
			} else if (keyCode === 40) {		// 40 Down arrow
				dropPlayer();
			}
		}
	}

	return (
		<div 
			className={styles.TetrisWrapper} 
			style={{background: 'url('+bg+')', backgroundSize: 'cover'}}
			role="button"
			tabIndex="0"
			onKeyDown={(e) => move(e)}
		>
			<div className={styles.Tetris}>
				<Stage stage={stage} />
				<aside>
					{
						gameOver ?
							<Display gameOver={gameOver} text="Game Over" />
						:
							<div>
					    		<Display text="Score" />
					    		<Display text="Rows" />
					    		<Display text="Level" />
							</div>

					}
					<StartButton callback={startGame} />
				</aside>
			</div>	
		</div>	
	);
};

export default Tetris;
