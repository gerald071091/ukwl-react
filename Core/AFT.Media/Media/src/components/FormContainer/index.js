/**
 * Created by isabella.inosantos on 5/9/2017.
 */
import React from 'react';
import styles from './formcontainer.scss';

let FormContainer = (props) => {

	return (
		<div className={styles.containerBody}>
			<div className={styles.formHeader}>
				{props.title || props.titleDiv || 'text'}
			</div>
			<div className={`${styles.formBody} ${props.noOverflow ? 'no-overflow' : '' }`}>
				{props.children}
			</div>
		</div>
	);
};

FormContainer.propTypes = {
	children: React.PropTypes.node,
	noOverflow: React.PropTypes.bool,
	title: React.PropTypes.string,
	titleDiv: React.PropTypes.node
};

export default FormContainer;