import React from 'react';

import { setDisplayStyles } from '../../utils';
import styles from './styles.module.scss';


const Display = ({gameOver, text}):JSX.Element => {
  return (
    <div style={setDisplayStyles(gameOver)}>{text}</div>
  );
};

export default Display;
