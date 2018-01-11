/**
 * Created by bernard.molina on 5/22/2017.
 */
import React from 'react';
import {Loader} from 'react-loaders';
import styles from './loader.scss';

let Loaders = () => {
	return(
		<Loader className={styles.loader} type="ball-pulse-sync" />
	)
};


export default Loaders;
