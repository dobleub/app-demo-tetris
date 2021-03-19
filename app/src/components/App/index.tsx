import React from 'react';

import Tetris from '../Tetris'

import styles from './styles.module.scss';

const App = ():JSX.Element => {
	return (
		<div className={styles.App}>
			<Tetris />
		</div>
	);
};

export default App;
