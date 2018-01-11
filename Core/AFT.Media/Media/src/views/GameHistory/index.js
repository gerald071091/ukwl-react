/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import React from 'react';

import { BtnBlue } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import Select from 'comp/Select';
import DatePicker from 'comp/DatePicker';

import moment from 'moment';

import rAccounts from 'res/accounts';
import rCasino from 'res/casino';

import iCommon from './common';
import iMessages from './messages';
import enums from './enums';
import styles from './gamehistory.scss';

class GameHistory extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._handleChangeStart = this._handleChangeStart.bind(this);
		this._handleChangeEnd = this._handleChangeEnd.bind(this);
		this._submit = this._submit.bind(this);
	}

	state = {
		endDate: moment().add(1, 'months'),
		histories: [],
		product: '',
		playerName: '',
		startDate: moment(),
		totalBetCount: 0,
		totalBetAmount: 0,
		totalWinLoss: 0,
		totalNumber: 0
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "Game History");

		rAccounts.details().done((response) => {
			this.setState({ playerName: response.user.firstName + ' ' + response.user.lastName });
		});
	}

	_handleChangeStart(date) {
		this.setState({
			startDate: date
		})
	}

	_handleChangeEnd(date) {
		this.setState({
			endDate: date
		})
	}

	_submit() {
		let startDate = document.getElementById("start-date").value,
			endDate = document.getElementById("end-date").value,
			product = document.getElementById("products").value,
			transactionLimit = document.getElementById("transaction-limit").value;

		console.log(startDate, endDate);

		rCasino.histories(product, startDate, endDate, 1, parseInt(transactionLimit))
			.done((res) => {
				console.log(res);

				this.setState({
					histories: res.histories,
					product: product,
					totalBetCount: res.totalBetCount,
					totalBetAmount: res.totalBetAmount,
					totalWinLoss: res.totalWinloss,
					totalNumber: res.totalNumber
				});
			});

	}

	render() {

		const TABLEHEADER = (
			<div className="row">
				{
					enums.headerTitles.map((data, i) => {
						return (
							<div className="col-xs-2" key={i}>
								{data}
							</div>
						)
					})
				}
			</div>
		);

		return (
			<div className={styles.ghContainer}>
				<h2 className="mainTitle">{iCommon('fGameHistory')}</h2>
				<p>
					Welcome <span className="red">{this.state.playerName}</span>! <br />
					{iMessages('gameHistoryMsg')}
				</p>

				<FormContainer title={iCommon('tGameHistory')}>
					<div className={styles.row}>
						<div className="col-xs-3">
							<label>Account Name:</label>
						</div>
						<div className="col-xs-3">
							{this.state.playerName}
						</div>
						<div className="col-xs-6">
							<Select
								id="products"
								options={enums.products}
								placehoder="--Product--"
								pKey="ep"
								value="text"/>
						</div>
					</div>
					<div className={styles.row}>
						<div className="col-xs-3">
							<label>Total Bet Amount:</label>
						</div>
						<div className="col-xs-3">
							{this.state.totalBetAmount ? this.state.totalBetAmount : `0`}
						</div>
						<div className="col-xs-3">
							<label>Win/Loss:</label>
						</div>
						<div className="col-xs-3">
							{this.state.totalWinLoss ? this.state.totalWinLoss : `0`}
						</div>
					</div>
					<div className={styles.row}>
						<div className="col-xs-6">
							<DatePicker
								id="start-date"
								dropdownMode="select"
								onChange={this._handleChangeStart}
								selected={this.state.startDate}/>
						</div>
						<div className="col-xs-6">
							<DatePicker
								id="end-date"
								dropdownMode="select"
								onChange={this._handleChangeEnd}
								selected={this.state.endDate}/>
						</div>
					</div>
					<div className={styles.row}>
						<div className="col-xs-6">
							<Select
								id="transaction-limit"
								options={enums.transactionLimits}
								placehoder="--Transaction Limit--"
								pKey="value"
								value="value"/>
						</div>
						<div className="col-xs-3">
							<label># of Bets:</label>
						</div>
						<div className="col-xs-3">
							{this.state.totalBetCount ? this.state.totalBetCount : `0`}
						</div>
					</div>
					<div className={styles.row}>
						<div className="col-xs-3 pull-right">
							<BtnBlue
								text={iCommon('cSubmit')}
								onClick={this._submit}/>
						</div>
					</div>
				</FormContainer>

				<FormContainer titleDiv={TABLEHEADER}>
					{this.state.histories.length > 0 ? this.state.histories.map((data, i) => {
						const PRODUCT = $.grep(enums.products, (data) => {
							return data.ep === this.state.product;
						});
						return (
							<div className="row" key={i}>
								<div className="col-xs-2">
									{PRODUCT[0].text}
								</div>
								<div className="col-xs-2">
									{PRODUCT[0].id}
								</div>
								<div className="col-xs-2">
									{data.betDate}
								</div>
								<div className="col-xs-2">
									{data.betCount}
								</div>
								<div className="col-xs-2">
									{data.betAmount}
								</div>
								<div className="col-xs-2">
									{data.winLoss}
								</div>
							</div>
						)
					}) : <div className="text-center">No Records</div> }
				</FormContainer>
			</div>
		);
	}
}

export default GameHistory;