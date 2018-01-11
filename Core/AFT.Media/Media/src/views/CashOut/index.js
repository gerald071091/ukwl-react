/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import format from 'string-format';

import iCommon from './common';

import styles from './cashout.scss'

class CashOut extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	state = {
		content: ''
	};

	componentDidMount() {
		this.props.getText('sidebarInfo', "Cash Out");
	}

	render() {
		return(
			<div>
				<h2 className="mainTitle">{iCommon('headerTitle')}</h2>
				<div dangerouslySetInnerHTML={{ __html: iCommon('cashoutMarkup') }} />
				<div dangerouslySetInnerHTML={{ __html: format(iCommon('rulesMarkup'), styles.listStyle) }} />
			</div>
		);
	}
}

export default CashOut;