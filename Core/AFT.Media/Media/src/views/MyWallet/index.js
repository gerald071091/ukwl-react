/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import React from 'react';
import { LinkBtnBlue } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import Select from 'comp/Select';

//import utils from 'helpers/utils';

import rAccounts from 'res/accounts';
import rBalance from 'res/balances';

import iCommon from './common';
import enums from './enums';
import styles from './mywallet.scss';

class MyWallet extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._getBalances = this._getBalances.bind(this);
	}

	state = {
		availableBalance: 0,
		mainBalance: 0,
		microgamingBalance: 0,
		playerName: ''
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "My Wallet");

		rAccounts.details().done((response) => {
			this.setState({ playerName: response.user.firstName + ' ' + response.user.lastName });
		});

		this._getBalances();
	}

	_getBalances() {
		$.when(
			rBalance.walletBalances('main'),
			rBalance.walletBalances('microgaming'),
			rBalance.walletBalances('sbtech')
		).done((r1, r2, r3) => {
			this.setState({
				mainBalance: r1[0].balance,
				microgamingBalance: r2[0].balance,
				availableBalance: r3[0].balance
			});

		})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(errMsg);
			});
	}

	render() {
		return (
			<div>
				<h2 className="mainTitle">{iCommon('fMyWallet')}</h2>
				<p>
					Welcome <span className="red">{this.state.playerName}</span>! <br />
					This area provides you the details of the balances for your Main Wallet.
				</p>

				<FormContainer title={iCommon('hBalance')}>
					<div className={styles.row}>
						<div className="col-xs-4">
							<label>{iCommon('mainWallet')}:</label>
						</div>
						<div className="col-xs-3">
							{window.currencySymbol}{this.state.mainBalance}
						</div>
						<div className="col-xs-4">
							<LinkBtnBlue to="withdrawal" text="Withdraw Funds"/>
						</div>
					</div>
					<div className={styles.row}>
						<div className="col-xs-4">
							<label>{iCommon('availBalance')}:</label>
						</div>
						<div className="col-xs-3">
							{window.currencySymbol}{this.state.availableBalance}
						</div>
						<div className="col-xs-4">
							<Select
								id="select_balance"
								options={enums.dropdown}
								onChange={this._getBalances}
								pKey="value"
								value="text"/>
						</div>
					</div>
					<img src={window.cmsMedia("Content/images/secure.png")} />
				</FormContainer>
			</div>
		);
	}
}

export default MyWallet;