import React from 'react';

import Cell from '../Cell';

import { setStageStyles } from '../../utils';
import styles from './styles.module.scss';

const Stage = ({ stage }):JSX.Element => {
	return (
		<div style={setStageStyles(stage.length, stage[0].length)}>{
			stage.map((row) => 
				row.map((cell, x) => 
					<Cell key={x} type={cell[0]} />
				)
			)
		}</div>
	);
};

export default Stage;
