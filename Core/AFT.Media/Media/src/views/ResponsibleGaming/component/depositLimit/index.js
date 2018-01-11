/**
 * Created by isabella.inosantos on 6/2/2017.
 */

import React from 'react';
import Select from 'comp/Select';
import Input from 'comp/Input';
import { BtnBlue } from 'comp/Button';

import enums from './enums';
//import styles from '../../responsiblegaming.scss';
import iCommon from '../../common';
import styles from './depLimit.scss';

class RGDepositLimit extends React.Component {
	static propTypes = {
		depositLimit: React.PropTypes.object,
		disableAmt: React.PropTypes.bool,
		disableDL: React.PropTypes.bool,
		getDepositLimits: React.PropTypes.func,
		playerStatus: React.PropTypes.string,
		submitDepositLimit: React.PropTypes.func,
		saveWithConfirmation: React.PropTypes.func,
		setDepositLimitType: React.PropTypes.func,
		setDepositLimitAmount: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._submit = this._submit.bind(this);
	}

	componentDidMount() {
		this.props.getDepositLimits();
		console.log(this.props.depositLimit);
	}

	_submit() {
		let type = document.getElementById("depositLimitType");
		let amount = document.getElementById("depositLimitAmount");

		this.props.submitDepositLimit(type, amount);
	}

	render() {
		const DEPLIMITS = [
			{ text: "Daily Limit", value: this.props.depositLimit.dayLimit },
			{ text: "Weekly Limit", value: this.props.depositLimit.weekLimit },
			{ text: "Monthly Limit", value: this.props.depositLimit.monthLimit },
		];

		let confirmTemp = '',
			pendingChange = this.props.depositLimit.pendingChange;

		let confirmMessage = '';

		if (pendingChange) {
			if (pendingChange.newLimit !== 0) {
				if (pendingChange.canConfirm) {
					confirmMessage = (
						<div className={styles.confirmContainer}>
							Please confirm your deposit limit now:<br />
							<label>{pendingChange.changeType} limit
								of {window.currencySymbol}{pendingChange.newLimit}</label>
							<br /><br />
							Your new deposit limit will only take effect once you confirm.
							<br />
							If you wish to change your mind and retain your current deposit limit, click the CANCEL
							button.
							<br />
							If you wish to remove your current deposit limit, you may select the "No Deposit Limit"
							option or contact Customer Service.
						</div>
					);
				} else {
					confirmMessage = (
						<div className={styles.confirmContainer}>
							Confirm your deposit limit:
							<br />
							<label>{pendingChange.changeType} limit
								of {window.currencySymbol} {pendingChange.newLimit}</label>
							<br />
							{pendingChange.cooldownText}
							<br />
							If you wish to change your mind and retain your current deposit limit, click the CANCEL
							button.
							<br />
						</div>
					);
				}
			} else {
				confirmMessage = (
					<div className={styles.confirmContainer}>
						{pendingChange.cooldownText}
						<br />
						{
							pendingChange.canConfirm && <span>
								Please confirm if you still want to remove your current deposit limit.
								<br />
								This will only take effect once you confirm.
								<br />
							</span>
						}
						If you wish to change your mind and retain your current deposit limit, click the CANCEL button.
					</div>
				);
			}
		}

		if (pendingChange) {
			confirmTemp = (
				<div className="col-xs-12">
					<hr />
					{confirmMessage}


					<div className={styles.lastRow}>
						{
							pendingChange.canConfirm &&
							<BtnBlue
								id="dl-confirm-btn"
								className={`${styles.confirmButt} col-xs-2`}
								text={iCommon('cConfirm')}
								onClick={this.props.saveWithConfirmation}/>
						}

						<BtnBlue
							id="dl-cancel-btn"
							className="col-xs-2"
							text={iCommon('cCancel')}
							onClick={this.props.saveWithConfirmation}/>
					</div>
				</div>
			);
		}

		return (
			<div>
				{
					DEPLIMITS.map((data, i) => {
						return (
							<div key={i} className={`${styles.formGroup} row`}>
								<div className="col-xs-4">
									<label className="control-label">{data.text}</label>
								</div>
								<div className="col-xs-8">
									{data.value === 0 ? data.value : `${window.currencySymbol} ${data.value}`}
								</div>
							</div>
						)
					})
				}
				<div className={`${styles.formGroup} row`}>
					<div className="col-xs-4">
						<label className="control-label">
							Set limitation to amount you can deposit by:
						</label>
					</div>
					<div className="col-xs-4">
						<Select
							id="depositLimitType"
							defaultValue="1"
							disabled={this.props.disableDL}
							options={enums.limits}
							onChange={this.props.setDepositLimitType}
							pKey="id"
							value="text"/>
					</div>
				</div>
				<div className={`${styles.formGroup} row`}>
					<div className="col-xs-4">
						<label className="control-label">
							Amount:
						</label>
						<span className="pull-right">{window.currencySymbol}</span>
					</div>
					<div className="col-xs-4">
						<Input
							type="text"
							id="depositLimitAmount"
							defaultValue="0"
							disabled={this.props.disableAmt}
							onBlur={this.props.setDepositLimitAmount}
						/>
					</div>
				</div>
				<p className={styles.clearfix}
					dangerouslySetInnerHTML={{ __html: iCommon('rgDLDescription') }}/>
				<div className={styles.lastRow}>
					<BtnBlue
						id="dl-save-btn"
						className="col-xs-2 pull-right"
						disabled={this.props.disableDL}
						text={iCommon('rgSave')}
						onClick={this._submit}/>
				</div>
				{confirmTemp}
			</div>
		);
	}
}

export default RGDepositLimit;