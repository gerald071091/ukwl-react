/**
 * Created by bernard.molina on 6/5/2017.
 */
import React from 'react';
import BaseComponent from 'base-component';
import iCommon from '../../../../Deposit/common';
import iMessages from '../../../messages';
import utils from 'helpers/utils';
import Input from 'comp/Input';
import NetellerDetails from './NetellerDetails';
import rDeposit from 'res/deposit';
import enums from '../../../../Deposit/enums';
import PaymentTemplate from 'comp/PaymentTemplate';
import rAccounts from 'res/accounts';
import styles from './neteller.scss';

class Neteller extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		onBlur: React.PropTypes.func,
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._checkboxVal = this._checkboxVal.bind(this);
		this._checkResponse = this._checkResponse.bind(this);
		this._getAcctDetails = this._getAcctDetails.bind(this);
		this._getDepositInfo = this._getDepositInfo.bind(this);
		this._submit = this._submit.bind(this);
		this._validateAccountID = this._validateAccountID.bind(this);
		this._validateAmount = this._validateAmount.bind(this);
		this._validateSecuriyId = this._validateSecuriyId.bind(this);
	}

	state = {
		userFullName: '',
		depLimitContent: '',
		isCheck: false
	};

	componentDidMount(){
		this._getAcctDetails();
		this._getDepositInfo();
		this.props.getText('sidebarSettings', "Deposit");
	}

	_checkboxVal(){
		this.setState({ isCheck: !this.state.isCheck });
	}

	_checkResponse(data){
		let errMsg = `${iMessages('depButFollowErrBonusCode')} ${data.errorDetails}`;

		if(data.bonusResult !== undefined && data.bonusResult.errorCode !== ''){
			this.props.openModal({
				title: iCommon('cError'),
				msg: <div dangerouslySetInnerHTML={{__html: errMsg }} />,
				okCallback: () => {
					location.replace(`/${window.cultureCode}/depositSuccess/neteller?a=${data.payment.amount}&b=${data.payment.balance}&r=${data.payment.referenceNumber}`);
				}
			});
		}else{
			location.replace(`/${window.cultureCode}/depositSuccess/neteller?a=${data.payment.amount}&b=${data.payment.balance}&r=${data.payment.referenceNumber}`);
		}
	}

	_getAcctDetails(){
		rAccounts.details()
			.done((data) => {
				this.setState({
					userFullName: `${data.user.firstName} ${data.user.lastName}`
				})
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}

	_getDepositInfo(){
		rAccounts.getDPLimitInfo()
			.done((data) => {
				this.setState({ depLimitContent: data.message })
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}

	_submit(e){
		e.preventDefault();

		this._validateAmount();
		this._validateAccountID();
		this._validateSecuriyId();


		let amount = document.getElementById('netellerAmount').value,
			accountID = document.getElementById('acctId').value,
			securityID = document.getElementById('securityId').value,

			data = {
				amount: amount,
				bonusCode: '',
				product: 'main',
				agreedToTerms: false,
				sendTerms: false,
				depositUrl: `${window.hostUrl}/${window.cultureCode}/payment/deposit`,
				casinoUrl: `${window.hostUrl}/${window.cultureCode}/casino`,
				accountId: accountID,
				secureId: securityID
			};

		if(!$('.input-msg-error').is(":visible")){
			if (this.state.isCheck) {
				rDeposit.netellerDeposit(data)
					.done((data)=> {
						this._checkResponse(data);
					})
					.fail((jqXHR, textStatus, errMsg) => {
						console.log(jqXHR, textStatus, errMsg);
						this.props.openModal({
							title: iCommon('cError'),
							msg: <div dangerouslySetInnerHTML={{__html: errMsg }} />
						});
					});
			}else{
				this.props.openModal({
					title: iCommon('cError'),
					msg: <div dangerouslySetInnerHTML={{__html: iMessages('agreedTerms')}} />
				});
			}
		}
	}

	_validateAccountID(){
		let target = document.getElementById('acctId');

		utils.addValidError(target.value !== '', target, iMessages('acctId'));
	}


	_validateAmount(){
		let target = document.getElementById('netellerAmount');

		utils.addValidError(target.value !== '', target, iMessages('amount'));
	}


	_validateSecuriyId(){
		let target = document.getElementById('securityId');

		utils.addValidError(target.value !== '', target, iMessages('securId'));
	}

	render(){
		let depLimitInfo = this.state.depLimitContent === 'No Deposit limit' ? '' : this.state.depLimitContent;
			return (
				<div>
					<h1>{iCommon('cDeposit')}</h1>
					<p>{`${iCommon('cWelcome')} ${this.state.userFullName}!`}</p>

					<div className={styles.acctLogin}>
						<PaymentTemplate data={'neteller'} radioButton={false} />

						<div className="row">
							<p className="col-lg-3">{iCommon('acctLogin')}</p>
							<p className="col-lg-3">{window.username}</p>
							<p className="col-lg-3">{iCommon('acctName')}</p>
							<p className="col-lg-3">{this.state.userFullName}</p>
						</div>

						<div className={`${styles.depositAmount} row`}>
							<p className="col-lg-3">{iCommon('enterAmt')}</p>
							<div className="col-lg-3">
								<Input
									onBlur={this._validateAmount}
									id="netellerAmount"
									type="number" />
							</div>

							<div className={`col-lg-5 ${styles.depButton}`}>
								<p>{iCommon('orSelect')}</p>
									{enums.depositButtons().map((data, key) => {
										return(
											<button
												key={key}
												onClick={this._setDepValue}
												data={data.value}>{data.text}</button>
										)
									})}
							</div>
						</div>

						<div className={styles.dpLimit} dangerouslySetInnerHTML={{__html: depLimitInfo}} />
					</div>

					<NetellerDetails
						blurAcctID={this._validateAccountID}
						blurSecureID={this._validateSecuriyId}
						isChecked={this.state.isCheck}
						onClick={this._checkboxVal}
						submit={this._submit}/>
				</div>
		)
	}
}

export default BaseComponent(Neteller);
