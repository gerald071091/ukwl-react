/**
 * Created by isabella.inosantos on 6/13/2017.
 */

import React from 'react';

import { BtnBlue } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import Select from 'comp/Select';
import DatePicker from 'comp/DatePicker';

import moment from 'moment';

import rAccounts from 'res/accounts';
import PaymentBase from 'res/payments';

import iCommon from './common';
import iMessages from './messages';
import enums from './enums';
import styles from './transactionhistory.scss';

const RPAYMENT = new PaymentBase();

class TransactionHistory extends React.Component {

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
		playerName: '',
		startDate: moment(),
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "Transaction History");

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
			transactionLimit = document.getElementById("transaction-limit").value,
			transactionType = document.getElementById("transaction-type").value;

		RPAYMENT.histories(transactionType, startDate, endDate, 1, parseInt(transactionLimit))
			.done((res) => {
				console.log(res);
				this.setState({
					histories: res.histories,
				});
			});
	}

	render() {

		const TABLEHEADER = (
			<div>
				{
					enums.headerTitles.map((data, i) => {
						return (
							<div className={styles.tableText} key={i}>
								{data}
							</div>
						)
					})
				}
			</div>
		);

		return (
			<div className={styles.thContainer}>
				<h2 className="mainTitle">{iCommon('fTransHistory')}</h2>
				<p>
					Welcome <span className="red">{this.state.playerName}</span>! <br />
					{iMessages('transHistoryMsg')}
				</p>

				<FormContainer title={iCommon('tTransHistory')}>
					<div className={styles.row}>
						<div className="col-xs-6">
							<Select
								id="transaction-type"
								options={enums.transactionTypes}
								placehoder="--Transaction Type--"
								pKey="id"
								value="text"/>
						</div>
						<div className="col-xs-6">
							<Select
								id="transaction-limit"
								options={enums.transactionLimits}
								placehoder="--Transaction Limit--"
								pKey="value"
								value="value"/>
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
						<div className="col-xs-3 pull-right">
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
								<div className={styles.tableText}>
									{data.tracskingNumber}
								</div>
								<div className={styles.tableText}>
									{data.type}
								</div>
								<div className={styles.tableText}>
									{data.date}
								</div>

								<div className={styles.tableText}>
									{data.statusDesc}
								</div>
								<div className={styles.tableText}>
									{data.amount}
								</div>
							</div>
						)
					}) : <div className="text-center">No Records</div> }
				</FormContainer>
			</div>
		);
	}
}

export default TransactionHistory;