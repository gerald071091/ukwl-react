/**
 * Created by gian.jamisola on 5/4/2017.
 */

import format from 'string-format';
import React from 'react';

import BaseComponent from 'base-component';
import RGDepositLimit from './component/depositLimit';
import RealityCheck from './component/realityCheck';
import SelfExclude from './component/selfExclude';
import TimeOut from './component/timeOut';
import FormContainer from 'comp/FormContainer';
import { BtnBlue } from 'comp/Button';
import Input from 'comp/Input';

import iCommon from './common';
import iMessages from './messages';

import rResponsibleGaming from 'res/responsibleGaming';
import rAuthentication from 'res/authentication';
import rRealityCheck from 'res/realityCheck';
import rAccounts from 'res/accounts';

import styles from './responsiblegaming.scss';

import utils from 'helpers/utils';

const EMPTYFUNC = () => {};

class ResponsibleGaming extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._disableFields = this._disableFields.bind(this);
		this._getCompulsiveGamblerVal = this._getCompulsiveGamblerVal.bind(this);
		this._getDaysValue = this._getDaysValue.bind(this);
		this._getDepositLimits = this._getDepositLimits.bind(this);
		this._getMsgObj = this._getMsgObj.bind(this);
		this._getRealityCheck = this._getRealityCheck.bind(this);
		this._initializeRealityCheck = this._initializeRealityCheck.bind(this);
		this._saveWithConfirmation = this._saveWithConfirmation.bind(this);
		this._setDepositLimitAmount = this._setDepositLimitAmount.bind(this);
		this._setDepositLimitType = this._setDepositLimitType.bind(this);
		this._submitDepositLimit = this._submitDepositLimit.bind(this);
		this._submitRealityCheck = this._submitRealityCheck.bind(this);
		this._submitTimeOutSelfExclude = this._submitTimeOutSelfExclude.bind(this);
	}

	state = {
		playerStatus: '',
		//**TIMEOUT/SELFEXCLUDE
		validateCompulsiveGambler: '',
		isCompulsiveGambler: false,
		selfExcludeType: '',
		daysValue: 0,
		cbTOVal: false,
		cbSEVal: false,
		dsbldSelectTO: true,
		dsbldSelectSE: true,
		msgObj: {},
		//**REALITYCHECK
		interval: 0,
		cbRealityCheck: false,
		dsbldRealityCheck: true,
		//**Deposit Limit
		depositLimit: {},
		depositLimitType: 0,
		depositLimitAmount: '',
		disableDL: false,
		disableAmt: false
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', format(iCommon('rgHeaderTitle'), ''));

		//****INSERT CHECKING HERE IF PLAYER IS SUSPENDED THEN DISABLE ALL FIELDS (TO/SE/RC)
		rAccounts.details()
			.done((result) => {
				this.setState({ playerStatus: result.user.status });
				this._disableFields(result.user.status);
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					msg: errMsg,
					title: iCommon('cError')
				})
			});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextState.cbTOVal !== this.state.cbTOVal ||
			nextState.cbSEVal !== this.state.cbSEVal ||
			nextState.validateCompulsiveGambler !== this.state.validateCompulsiveGambler ||
			nextState.cbRealityCheck !== this.state.cbRealityCheck ||
			nextState.interval !== this.state.interval ||
			nextState.depositLimit !== this.state.depositLimit ||
			nextState.depositLimitType !== this.state.depositLimitType ||
			nextState.depositLimitAmount !== this.state.depositLimitAmount ||
			nextState.disableAmt !== this.state.disableAmt ||
			nextState.disableDL !== this.state.disableDL
		);
	}

	_disableFields(data) {
		let tmpFunc = (data) => {

			if (data.type === "cb-timeout") {
				data.value ? this.setState({
					dsbldSelectTO: false,
					cbTOVal: true,
					dsbldSelectSE: true,
					cbSEVal: false,
					selfExcludeType: 'timeout'
				})
					: this.setState({
					dsbldSelectTO: true,
					cbTOVal: false
				});
			}
			else if (data.type === "cb-selfexclude") {
				data.value ? this.setState({
					dsbldSelectSE: false,
					cbSEVal: true,
					dsbldSelectTO: true,
					cbTOVal: false,
					selfExcludeType: 'selfexclude'
				})
					: this.setState({
					dsbldSelectSE: true,
					cbSEVal: false
				});

			}
			else if (data.type === "cb-realitycheck") {
				data.value ? this.setState({
					dsbldRealityCheck: false,
					cbRealityCheck: true
				})
					: this.setState({
					dsbldRealityCheck: true,
					cbRealityCheck: false,
					interval: 0
				});
			}
			else {
				const DISABLEALLFIELDS = (status) => {
					const FORMFIELDS = document.querySelectorAll('input, select, button');

					for (let x in FORMFIELDS) {
						status.toUpperCase() === 'SUSPENDED' ? FORMFIELDS[x].disabled = true : '';
					}
				}

				(data !== '' && DISABLEALLFIELDS(data));
			}
		};

		(data && tmpFunc(data))
	}

	_getCompulsiveGamblerVal(e) {
		let tmp = e.currentTarget.id === "cg-yes" ? true : false;
		this.setState({ isCompulsiveGambler: tmp, validateCompulsiveGambler: 'true' });
	}

	_getDaysValue(data) {
		const DAYSVALUE = typeof data === 'object' ? data.target.value : data;
		this.setState({ daysValue: DAYSVALUE });
	}

	_getDepositLimits() {
		rAccounts.depositLimits().done((res) => {
			console.log(res);
			if (res.pendingChange) {
				this.setState({
					depositLimit: res,
					disableAmt: true,
					disableDL: true
				});
			} else {
				this.setState({
					depositLimit: res,
					disableAmt: false,
					disableDL: false
				});
			}
		})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					title: iCommon('cError'),
					msg: errMsg
				});
			});
	}

	_getMsgObj(data) {
		this.setState({ msgObj: data });
	}

	_getRealityCheck(data) {
		const RCVALUE = typeof data === 'object' ? data.target.value : data;
		this.setState({ interval: RCVALUE });
	}

	_initializeRealityCheck() {
		rRealityCheck.getRealityCheck()
			.done((result) => {
				result.alertTime !== 0 && (this.setState({
					interval: result.alertTime,
					cbRealityCheck: true,
					dsbldRealityCheck: false
				}), initializeRCSelect)

				let initializeRCSelect = () => {
					const INITINTERVAL = result.alertTime,
						RCSELECT = document.getElementById("sb-realitycheck");

					for (let x in RCSELECT) {
						(RCSELECT.options[x].value === INITINTERVAL) && (RCSELECT[x].selectedIndex = x)
					}

				}
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					msg: errMsg,
					title: iCommon('cError'),
					isConfirm: false,
					isPlain: false
				})
			})
	}

	_saveWithConfirmation(e) {
		const moduleID = e.target.id;

		let toseConfirm = () => {
			let isValidated = (this.state.cbTOVal || this.state.cbSEVal) ? true : false;

			let rgType = this.state.cbTOVal ? iCommon('rgTimeOut') : iCommon('rgSelfExclude');
			let confirmMsg = <div>
				{format(iMessages('selfExcludeConfirm'), rgType)}
				<p>Once you click accept there's no going back.</p>
				<p>Click <a href="javascript:void(showLiveChat())" onClick={this.props.closeModal()}>here</a> to speak
					to Customers Services if you're not sure.</p>
			</div>

			if (isValidated) {
				if (this.state.validateCompulsiveGambler === 'true') {
					let showFinalModal = () => {
						this.props.closeModal();
						this.props.openModal({
							msg: this.state.msgObj.msg,
							title: this.state.msgObj.title,
							okCallback: this._submitTimeOutSelfExclude,
							isConfirm: false,
							isPlain: false
						})
					};

					this.props.openModal({
						msg: confirmMsg,
						okCallback: showFinalModal,
						isConfirm: true,
						isPlain: false,
						buttonText: iCommon('cAccept')
					})

				} else {
					this.setState({ validateCompulsiveGambler: 'false' });
				}
			} else {

				let promptCBError = (cgTrigger) => {
					this.props.openModal({
						msg: `${iCommon('rgTimeOut')} or ${iCommon('rgSelfExclude')} should be checked.`,
						isConfirm: false,
						isPlain: false,
						title: iCommon('cError')
					});

					(cgTrigger && this.setState({ validateCompulsiveGambler: 'false' }))
				};

				this.state.validateCompulsiveGambler === "true" ? promptCBError(false) : promptCBError(true);

			}
		};

		let rcConfirm = () => {
			let rcInterval = this.state.interval,
				intervalFormatted = '';

			if (rcInterval === 0) {
				this.props.openModal({
					msg: iMessages('realityCheckZero'),
					isConfirm: true,
					isPlain: false,
					buttonText: iCommon('cAccept'),
					okCallback: this._submitRealityCheck
				})
			} else {
				const HOURTYPE = () => {
					const HOURDIVISOR = 60;
					intervalFormatted = `${(rcInterval / HOURDIVISOR)} hours`;
				};

				const MINUTETYPE = () => {
					intervalFormatted = `${rcInterval} minutes`;
				};

				rcInterval >= 60 ? HOURTYPE() : MINUTETYPE();

				this.props.openModal({
					msg: format(iMessages('realityCheckConfirm'), intervalFormatted),
					isConfirm: true,
					isPlain: false,
					buttonText: iCommon('cAccept'),
					okCallback: this._submitRealityCheck
				})
			}
		};

		let dpConfirm = () => {
			alert("Confirm!");

			rAccounts.confirmDepositLimit()
				.done((rtn) => {
					let msg = (
						<div className='dp-limit-info'>
							<span>{rtn.message}</span><br /><br />
							As per our terms and conditions, once you have set a new limit, the full deposit value
							will be available to you regardless of any previous deposits you have made. Should you
							wish to discuss this or have other gambling concerns, please contact our <a href='#'
							                                                                            onClick={this.props.closeModal()}>Customer
							Service</a>.
						</div>
					);

					this.props.openModal({
						title: iCommon('cConfirmed'),
						msg: msg
					});
				}).always(() => {
				//self.processingDepositLimit(false);
			});

		};

		let dpCancel = () => {
			rAccounts.cancelDepositLimit()
				.done((rtn) => {
					this.props.openModal({
						title: iCommon('cSuccess'),
						msg: rtn.message
					});
					this._getDepositLimits();
				}).fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					title: iCommon('cError'),
					msg: errMsg
				});
			});
		};

		switch (moduleID) {
			case 'tose-btn':
				toseConfirm();
				break;
			case 'rc-btn':
				rcConfirm();
				break;
			case 'dl-confirm-btn':
				dpConfirm();
				break;
			case 'dl-cancel-btn':
				dpCancel();
				break;
		}
	}

	_setDepositLimitType() {
		let value = document.getElementById("depositLimitType").value,
			amtField = document.getElementById("depositLimitAmount");

		this.setState({ depositLimitType: value });

		if (value === "4") {
			amtField.value = "0";
			this.setState({ disableAmt: true, depositLimitAmount: 0 });
			utils.addValidError(true, amtField, iMessages('dpLimitIncorrectAmt'));
		} else {
			this.setState({ disableAmt: false });
		}
	}

	_setDepositLimitAmount() {
		let target = document.getElementById("depositLimitAmount");
		this.setState({ depositLimitAmount: target.value });

		let q = (target.value === "0" && this.state.depositLimitType !== "4");
		utils.addValidError(!q, target, iMessages('dpLimitIncorrectAmt'));
	}

	_submitDepositLimit(type, amount) {
		this._setDepositLimitType(type.value);
		this._setDepositLimitAmount(amount.value);

		let limits = [0, 0, 0];
		limits[type.value - 1] = parseFloat(amount.value);

		if (!$('.input-msg-error').is(":visible")) {
			console.log("success");
			rAccounts.setDepositLimits(
				limits[0], limits[1], limits[2])
				.done((rtn) => {
					let msg = "";
					let title = "";
					if (rtn.message.toLowerCase().match(/(increase|requested)/)) {
						title = iCommon('cSuccess');
						msg = rtn.message;
					} else {
						title = iCommon('cConfirmed');
						msg = (
							<div className='dp-limit-info'>
								<span>{rtn.message}</span><br /><br />
								As per our terms and conditions, once you have set a new limit, the full deposit value
								will be available to you regardless of any previous deposits you have made. Should you
								wish to discuss this or have other gambling concerns, please contact our <a href='#'
								onClick={this.props.closeModal()}>Customer
								Service</a>.
							</div>
						);
					}

					this.props.openModal({
						title: title,
						msg: msg
					});

					this._getDepositLimits();
				})
				.fail((jqXHR, textStatus, errMsg) => {
					this.props.openModal({
						title: iCommon('cError'),
						msg: errMsg
					});
				});

		}
	}

	_submitRealityCheck() {
		const FINALINTERVAL = this.state.interval;

		rRealityCheck.setRealityCheck(FINALINTERVAL)
			.done(() => {
				this.props.openModal({
					msg: iMessages('realityCheckSuccess'),
					title: iCommon('cNotice'),
				});

				this.setState({ interval: FINALINTERVAL });
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					msg: errMsg,
					title: iCommon('cError'),
					isConfirm: false,
					isPlain: false
				})
			})
	}

	_submitTimeOutSelfExclude() {
		let tmpArray = document.querySelectorAll("div[name$='-container']"),
			tmpObj = [];

		(() => {
			[].forEach.call(tmpArray, function(child) {
				child.querySelector("input[type='checkbox']").checked === true ?
					tmpObj.push(
						`${child.getAttribute("data-site")}:${child.querySelectorAll("input[type='text']")[0].value}`
					)
					: '';
			});
		})();

		const URI = tmpObj;

		const DATA = {
			days: this.state.daysValue,
			isCompulsiveGambler: this.state.isCompulsiveGambler,
			reason: '',
			linkedAccounts: URI
		};

		rResponsibleGaming.selfExclude(DATA)
			.done(() => {
				rAuthentication.logout()
					.done(() => {
						location.replace(
							`${window.location.pathname}complete/${DATA.days}/${this.state.selfExcludeType}`
						);
					});
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					msg: errMsg,
					title: iCommon('cError'),
					isConfirm: false,
					isPlain: false
				})
			})
	}

	render() {
		const addErrorClass = this.state.validateCompulsiveGambler === 'false' ? `${styles.cgError}` : '';
		return (
			<div id={styles.responsibleGamingContainer}>
				<h2 className="mainTitle">{format(iCommon('rgHeaderTitle'), '')}</h2>
				<p dangerouslySetInnerHTML={{ __html: format(iCommon('rgDescription'), "BetVision") }}></p>
				<FormContainer title={iCommon('rgDepositLimit')}>
					<RGDepositLimit
						depositLimit={this.state.depositLimit}
						disableAmt={this.state.disableAmt}
						disableDL={this.state.disableDL}
						getDepositLimits={this._getDepositLimits}
						saveWithConfirmation={this._saveWithConfirmation}
						setDepositLimitType={this._setDepositLimitType}
						setDepositLimitAmount={this._setDepositLimitAmount}
						playerStatus={this.state.playerStatus}
						submitDepositLimit={this._submitDepositLimit}/>
				</FormContainer>

				<FormContainer title={iCommon('rgRealityCheck')}>
					<RealityCheck playerStatus={this.state.playerStatus}
					              initializeRealityCheck={this._initializeRealityCheck}
					              getRealityCheck={this._getRealityCheck}
					              dsbldRealityCheck={this.state.dsbldRealityCheck}
					              cbRealityCheck={this.state.cbRealityCheck}
					              disableFields={this._disableFields}
					              saveWithConfirmation={this._saveWithConfirmation}/>
				</FormContainer>

				<FormContainer title={`${iCommon('rgTimeOut')} | ${iCommon('rgSelfExclude')}`}>
					<p>{iCommon('rgTOSEDescription')}</p>
					<TimeOut getMsgObj={this.state.cbTOVal ? this._getMsgObj : EMPTYFUNC}
					         disableFields={this._disableFields}
					         submit={this._submitTimeOutSelfExclude}
					         dsbldSelectTO={this.state.dsbldSelectTO}
					         cbTOVal={this.state.cbTOVal}
					         getDaysValue={this._getDaysValue}/>

					<SelfExclude getMsgObj={this.state.cbSEVal ? this._getMsgObj : EMPTYFUNC}
					             disableFields={this._disableFields}
					             submit={this._submitTimeOutSelfExclude}
					             dsbldSelectSE={this.state.dsbldSelectSE}
					             cbSEVal={this.state.cbSEVal}
					             getDaysValue={this._getDaysValue}/>

					<div className={`col-xs-12 ${styles.removePadding}`}>
						<div className={`col-lg-6 ${styles.removePadding}`}>
							<p className={addErrorClass}>{iCommon('rgCompulsiveGamblerDescription')}</p>
						</div>
						<div className="col-lg-2">
							<Input name="isCompulsiveGambler"
							       id="cg-yes"
							       className={styles.radioButton}
							       containerClass={`pull-left ${styles.adjustMarginRight}`}
							       type="radio"
							       value="Yes"
							       onChange={this._getCompulsiveGamblerVal}>
								<span className={addErrorClass}>&nbsp;{iCommon('rgYes')}</span>
							</Input>

							<Input name="isCompulsiveGambler"
							       id="cg-no"
							       className={styles.radioButton}
							       containerClass="pull-left"
							       type="radio"
							       value="No"
							       onChange={this._getCompulsiveGamblerVal}>
								<span className={addErrorClass}>&nbsp;{iCommon('rgNo')}</span>
							</Input>
						</div>
						<div className={`col-lg-4 ${styles.compulsiveGambler} ${addErrorClass}`}>Please confirm</div>
					</div>

					<p className={styles.clearfix}
					   dangerouslySetInnerHTML={{ __html: iCommon('rgTOSENoted') }}/>

					<div>
						<BtnBlue id="tose-btn"
						         className="col-xs-2 pull-right"
						         text={iCommon('rgSave')}
						         onClick={this._saveWithConfirmation}/>
					</div>
				</FormContainer>

			</div>
		);
	}
}

export default BaseComponent(ResponsibleGaming);