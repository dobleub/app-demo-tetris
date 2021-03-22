import React from 'react';

import { setCellStyles } from '../../utils';
import { TETROMINOS } from '../../utils/tetrominos';
import styles from './styles.module.scss';


const Cell = ({ type }):JSX.Element => {
	return (
		<div className={styles.Cell} style={setCellStyles(type, TETROMINOS[type].color)}></div>
	);
};

export default React.memo(Cell);
