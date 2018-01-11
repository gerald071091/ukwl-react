/**
 * Created by isabella.inosantos on 6/1/2017.
 */

import React from 'react';
import styles from './mobHeader.scss';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.mobHeader}>
				<div className="col-xs-3">
					menu
				</div>
				<div className="col-xs-6">
					<img className={styles.logo} src={window.cmsMedia("Content/images/_bvs/logo.svg")}/>
				</div>
				<div className="col-xs-3">
					<a href="#" className="icon-login">Login</a>
				</div>
			</div>
		);
	}
}

export default Header;