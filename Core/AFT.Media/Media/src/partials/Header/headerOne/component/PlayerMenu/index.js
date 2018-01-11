/**
 * Created by bernard.molina on 5/12/2017.
 */

import React from 'react';
import { Link } from 'react-router';

import rBalance from 'res/balances';

import utils from 'helpers/utils';

import iCommon from 'nls/common';
import styles from './playerMenu.scss';
import enums from '../../../enums';


class PlayerMenu extends React.Component {
	static propTypes = {
		logout: React.PropTypes.func,
		path: React.PropTypes.string
	};

	constructor(props) {
		super(props);

		this._getBalance = this._getBalance.bind(this);
		this._getCasinoBalance = this._getCasinoBalance.bind(this);
		this._getSportsbookBalance = this._getSportsbookBalance.bind(this);

	}

	state = {
		mainBalance: 0,
		casinoBalance: 0,
		casinoHasBonus: false,
		sportsBookBalance: 0,
		sportsBookHasBonus: false,
		showBalance: ''
	};

	componentDidMount() {

		this._getBalance();
		this._getSportsbookBalance();
		this._getCasinoBalance();
		this.mainBalanceInterval = utils.mainBalanceInterval = setInterval(this._getBalance, 1000 * 15);
		this.sportsbookBalanceInterval = utils.sportsbookBalanceInterval = setInterval(this._getSportsbookBalance, 1000 * 15);
		this.casinoBalanceInterval = utils.casinoBalanceInterval = setInterval(this._getCasinoBalance, 1000 * 15);
	}

	componentWillUnmount() {
		clearInterval(this.mainBalanceInterval);
		clearInterval(this.casinoBalanceInterval);
		clearInterval(this.sportsbookBalanceInterval);
	}

	_getBalance() {
		if (window.authed) {
			rBalance.walletBalances('main')
				.done((res) => {
					this.setState({
						mainBalance: res.balance
					});
				});
		}
	}

	_getSportsbookBalance() {
		if (window.authed) {
			rBalance.availableBalances('sbtech')
				.done((res) => {
					this.setState({
						sportsBookBalance: res.balance,
						sportsBookHasBonus: res.hasBonus
					});
				});
		}
	}

	_getCasinoBalance() {
		if(window.authed) {
			rBalance.availableBalances('amaya')
				.done((res) => {
					this.setState({
						casinoBalance: res.balance,
						casinoHasBonus: res.hasBonus
					});
				});
		}
	}

	render() {

		const ACOUNT = enums.HeaderAccount();
		const EMPTYFUNC = () => {};

		let balContainer = '';

		switch (this.props.path) {
			case 'casino':
				balContainer = (
					<div className={styles.wallet}>
						{`${iCommon('hAvailBalance')}: ${window.currencySymbol}${this.state.casinoBalance}`}
					</div>
				);
				break;

			case 'sportsbook':
				balContainer = (
					<div className={styles.wallet}>
						{`${iCommon('hAvailBalance')}: ${window.currencySymbol}${this.state.sportsBookBalance}`}
					</div>
				);
				break;

			default:
				balContainer = '';
				break;
		}

		return (
			<div className={styles.playerMenu}>
				<div className={styles.userHolder}>
					{`${iCommon('hHello')} ${window.username}`}

					<div className={styles.accNav}>
						{ACOUNT.map((data, key) => {
							let onClick = data.onClick ? this.props.logout : EMPTYFUNC;

							return (
								<Link key={key} to={data.link} onClick={onClick}>
									{data.text}
								</Link>
							)
						})}
					</div>
				</div>

				<div className={styles.wallet}>
					{`${iCommon('hMainWallet')}: ${window.currencySymbol}${this.state.mainBalance}`}
				</div>
				{balContainer}
			</div>
		)
	}
}

export default PlayerMenu;