import React from 'react';

import styles from './styles.module.scss';


const StartButton = ({ callback }):JSX.Element => {
	return (
		<div className={styles.StartButton} onClick={callback}>Start Game</div>
	);
};

export default StartButton;
