/**
 * Created by bernard.molina on 6/5/2017.
 */
import React from 'react';
import BaseComponent from 'base-component';
import iCommon from '../../../common';
import rAccounts from 'res/accounts';
import iMessages from '../../../messages';
import rDeposit from 'res/deposit';
import enums from '../../../enums';
import utils from 'helpers/utils';
import SkrillDetails from './SkrillDetails';
import PaymentTemplate from 'comp/PaymentTemplate';

import styles from './skrill.scss';

class Skrill extends React.Component {
	static propTypes = {
		route: React.PropTypes.string,
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		getText: React.PropTypes.func
	};

	constructor(props){
		super(props);

		this._checkboxVal = this._checkboxVal.bind(this);
		this._getAcctDetails = this._getAcctDetails.bind(this);
		this._getDepositInfo = this._getDepositInfo.bind(this);
		this._setDepValue = this._setDepValue.bind(this);
		this._submit = this._submit.bind(this);
		this._successSkrill = this._successSkrill.bind(this);
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
		this.setState({ isCheck: !this.state.isCheck })
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

	_setDepValue(e){
		let elem = e.target,
			val = $(elem).attr('data');

			document.getElementById('depositAmount').value = val;
	}

	_submit(e){
		e.preventDefault();

		let depositAmt = document.getElementById('depositAmount').value,
			data = {
				amount: utils.roundToDecimal(depositAmt),
				bonusCode: '',
				ReturnUrlPrefix: window.skrillReturnUrlPrefix,
				sendTerms: false,
				product: 'main'
			},

			oneTapData = {
				amount: utils.roundToDecimal(depositAmt),
				bonusCode: '',
				cmsDomain: window.skrillReturnUrlPrefix,
				gameId: 'main',
				platForm: window.isMobile ? "Mobile" : "Desktop",
				sendTerms: false,
			}

		if (this.state.isCheck){
			let isOneTap = this.props.route && this.props.route.skrillOnetap;

			this.props.openModal({
				showLoader: true
			});

			if(!isOneTap){
				rDeposit.skrillDeposit(data)
					.done((data) => {
						console.log(data);
						this.props.closeModal();
						this._successSkrill(data);
					})
					.fail((jqXHR, textStatus, errMsg) => {
						console.log(jqXHR, textStatus, errMsg);
						this.props.closeModal();
						this.props.openModal({
							title: iCommon('cError'),
							msg: errMsg
						});
					});
			}else{
				rDeposit.skrillOneTapUrl(oneTapData)
					.done((data) => {
						console.log(data);
						this.props.closeModal();
						this._successSkrill(data);
					})
					.fail((jqXHR, textStatus, errMsg) => {
						console.log(jqXHR, textStatus, errMsg);
						this.props.closeModal();
						this.props.openModal({
							title: iCommon('cError'),
							msg: errMsg
						});
					});
			}


		} else if (this.state.isCheck === false && depositAmt === ''){
			this.props.openModal({
				title: iCommon('cError'),
				msg: <div dangerouslySetInnerHTML={{__html: iMessages('amountReq')}} />
			});
		} else {
			this.props.openModal({
				title: iCommon('cError'),
				msg: <div dangerouslySetInnerHTML={{__html: iMessages('agreedTerms')}} />
			});
		}
	}

	_successSkrill(data){
		let isOneTap = this.props.route && this.props.route.skrillOnetap;

		if (data.bonusResult !== undefined && data.bonusResult.errorCode !== '') {
			console.log('test');
		}
		else if (isOneTap && data.url === undefined) {
			location.replace(`/${window.cultureCode}/depositSuccess/skrillOnetap?a=${data.amount}&b=${data.balance}&r=${data.referenceNumber}`);
		}
		else {
			location.replace(data.url);
		}
	}

	render(){
		let depLimitInfo = this.state.depLimitContent === 'No Deposit limit' ? '' : this.state.depLimitContent,
			paymentMethod = '',
			routePath = this.props.route && this.props.route.skrillOnetap;


		if(this.props.route && this.props.route.skrillOnetap){
			paymentMethod =
			<div className="row">
				<div className={styles.imgHolder}>
					<img src={window.cmsMedia(`Content/images/depositWithdrawal/skrill-one-tap.png`)} />
				</div>
				<div className={styles.loginDesc}>
					<p>{iCommon('skTitle')}</p>
					<p>{iCommon('skDescription')}</p>
				</div>
			</div>
		}else{
			paymentMethod = <PaymentTemplate data={'skrill'} radioButton={false} />
		}

		return (
			<div>
				<h1>{iCommon('cDeposit')}</h1>
				<p>{`${iCommon('cWelcome')} ${this.state.userFullName}!`}</p>

				<div className={styles.acctLogin}>
					{paymentMethod}

					<div className="row">
						<p className="col-lg-3">{iCommon('acctLogin')}</p>
						<p className="col-lg-3">{window.username}</p>
						<p className="col-lg-3">{iCommon('acctName')}</p>
						<p className="col-lg-3">{this.state.userFullName}</p>
					</div>

					<div className={`${styles.depositAmount} row`}>
						<p className="col-lg-3">{iCommon('enterAmt')}</p>
						<input id="depositAmount" type="number" className="col-lg-4" />

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

				<SkrillDetails
					isOneTap={routePath}
					isChecked={this.state.isCheck}
	                onClick={this._checkboxVal}
					submit={this._submit} />
			</div>
		)
	}
}

export default BaseComponent(Skrill);