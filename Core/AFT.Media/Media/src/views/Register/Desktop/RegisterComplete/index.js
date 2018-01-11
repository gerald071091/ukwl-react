/**
 * Created by isabella.inosantos on 5/31/2017.
 */


import React from 'react';
import iCommon from 'helpers/nls/common';
import { Link } from 'react-router';

class RegisterComplete extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getText("sidebarSettings", iCommon('regComplete'));
	}

	render() {
		return (
			<div className="RCPage">
				<h2 className="mainTitle">{iCommon('regComplete')}</h2>
				<div>
					<p>Thank you for registering with {window.siteName}.</p>
					<p>You will receive a welcome email shortly which will contain your Username, you will need to use this
						every time you log in so please keep it in a safe place.</p>
					<p>You are now able to play for real money, all you need to do is to deposit <Link to="/en-gb/deposit">here</Link> to get started.</p>
					<p>In accordance with our responsible gambling policy, you may set a deposit limit <Link
						to="/en-gb/responsiblegaming">here</Link> at any time.</p>
					<p>We hope you enjoy everything that {window.siteName} has to offer.</p>
					<p>Good luck!!</p>
				</div>
			</div>
		);
	}
}

export default RegisterComplete;