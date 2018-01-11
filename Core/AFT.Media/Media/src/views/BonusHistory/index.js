/**
 * Created by isabella.inosantos on 6/9/2017.
 */

import React from 'react';

import { BtnBlue } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import Select from 'comp/Select';
import DatePicker from 'comp/DatePicker';

import moment from 'moment';

import rAccounts from 'res/accounts';
import rBonus from 'res/bonuses';

import iCommon from './common';
import iMessages from './messages';
import enums from './enums';
import styles from './bonushistory.scss';

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
		startDate: moment()
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "Bonus History");

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
			status = document.getElementById("status").value,
			transactionLimit = document.getElementById("transaction-limit").value;

		console.log(startDate, endDate);

		rBonus.histories(product, status, startDate, endDate, 1, parseInt(transactionLimit))
			.done((res) => {
				console.log(res);

				this.setState({
					histories: res.histories,
					product: product
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
			<div className={styles.bhContainer}>
				<h2 className="mainTitle">{iCommon('fBonusHistory')}</h2>
				<p>
					Welcome <span className="red">{this.state.playerName}</span>! <br />
					{iMessages('bonusHistoryMsg')}
				</p>

				<FormContainer title={iCommon('tBonusHistory')}>
					<div className={styles.row}>
						<div className="col-xs-6">
							<Select
								id="products"
								options={enums.products}
								placehoder="--Product--"
								pKey="ep"
								value="text"/>
						</div>
						<div className="col-xs-6">
							<Select
								id="status"
								options={enums.status}
								placehoder="--Status--"
								pKey="value"
								value="text"/>
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
						<div className="col-xs-6 pull-right">
							<BtnBlue
								text={iCommon('cSubmit')}
								onClick={this._submit}/>
						</div>
					</div>
				</FormContainer>

				<FormContainer titleDiv={TABLEHEADER}>
					{this.state.histories.length > 0 ? this.state.histories.map((data, i) => {
						return (
							<div className="row" key={i}>
								<div className="col-xs-2">
									{data.code}
								</div>
								<div className="col-xs-2">
									{data.description}
								</div>
								<div className="col-xs-2">
									{data.product}
								</div>

								<div className="col-xs-2">
									{data.amount}
								</div>
								<div className="col-xs-2">
									{data.expiryDate}
								</div>
								<div className="col-xs-2">
									{data.status}
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