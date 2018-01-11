/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import { Link } from 'react-router';
import BaseComponent from 'base-component';
import styles from './register.scss';
import iMessages from './messages';
import iCommon from './common';
import enums from './enums';

import Input from 'comp/Input';
import Select from 'comp/Select';
import FormContainer from 'comp/FormContainer';
import { BtnGreen } from 'comp/Button';

import rRegister from 'res/register';
import rUtility from 'res/util';
import rAuthentication from 'res/authentication';

import utils from 'helpers/utils';
import rValidation from './validation';

import 'content/vendor/itl-tel-input/intlTelInput.min.js'


//const EMPTYFUNC = () => {};

class Register extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func,
		params: React.PropTypes.object
	};

	constructor(props) {
		super(props);

		this._checkCountry = this._checkCountry.bind(this);
		this._enterAddress = this._enterAddress.bind(this);
		this._findAddress = this._findAddress.bind(this);
		this._selectAddress = this._selectAddress.bind(this);
		this._showPostcode = this._showPostcode.bind(this);

		/*VALIDATION*/

		this._validateAddress = this._validateAddress.bind(this);
		this._validateDate = this._validateDate.bind(this);
		this._validateEmail = this._validateEmail.bind(this);
		this._validateMobNum = this._validateMobNum.bind(this);
		this._validateName = this._validateName.bind(this);
		this._validateNationality = this._validateNationality.bind(this);
		this._validatePassword = this._validatePassword.bind(this);
		this._validateCPassword = this._validateCPassword.bind(this);
		this._validatePostCode = this._validatePostCode.bind(this);
		this._validateSecAnswer = this._validateSecAnswer.bind(this);
		this._validateTitle = this._validateTitle.bind(this);
		this._validateUsername = this._validateUsername.bind(this);

		this._validateFields = this._validateFields.bind(this);

		this._redirectToHome = this._redirectToHome.bind(this);

		this._submit = this._submit.bind(this);
		this._login = this._login.bind(this);


	}

	state = {
		addressList: [],
		countries: [],
		countryCode: '',
		currencies: [],
		errMessages: [],
		isHousePlayer: '',
		hasAddressAttempts: false,
		isUK: false,
		nationalities: [],
		password: '',
		showAddressLines: false
	};

	componentDidMount() {
		this.props.getText('sidebarInfo', iCommon('fOpenAccount'));
		this.setState({ isHousePlayer: this.props.params.hp });

		$.when(
			rUtility.getCountries(),
			rUtility.getCurrencies(),
			rUtility.getNationalities()
		).done((v1, v2, v3) => {
			this.setState({ countries: v1[0].countries });
			this.setState({ currencies: v2[0].currencies });
			this.setState({ nationalities: v3[0].nationality });
		})
			.fail((jqXHR, textStatus, errMsg) => {
				utils.promptMessage(iCommon.error, errMsg);
			})
			.always(() => {
				rRegister.getCountryByIP().done((rtn) => {
					document.getElementById("country").value = rtn.message.toString();
					let selectedCountry = $.grep(this.state.countries,
						(e) => {
							return e.code === document.getElementById("country").value;
						});
					let selectedNationality = $.grep(this.state.nationalities,
						(e) => {
							return e.name === selectedCountry[0].name;
						});
					document.getElementById("nationality").value = selectedNationality[0].id.toString();
					this._checkCountry();
				}).fail((jqXHR, textStatus, errMsg) => {
					document.getElementById("country").value = "GB";
					document.getElementById("nationality").value = "234";
					this._checkCountry();

					console.log(jqXHR, textStatus, errMsg);
				});
			});

		let mobSelect = $("#mobile_number");

		mobSelect.intlTelInput({
			separateDialCode: 'true'
		});

		mobSelect.on("countrychange", () => {
			this.setState({ countryCode: mobSelect.intlTelInput("getSelectedCountryData").dialCode });
			//this._validateMobNum();
			console.log("changes!", this.state.countryCode );
		});
	}

	_checkCountry() {
		let countryISO = document.getElementById("country").value;
		$("#mobile_number").intlTelInput("setCountry", countryISO);
		if (countryISO === "GB") {
			this.setState({ isUK: true, showAddressLines: false });
			rRegister.getAddressAPIAttempts().done((data) => {
				if (data.addressUsage.dailyRequestCount >= data.addressUsage.dailyRequestLimit2) {
					this.setState({ hasAddressAttempts: false });
				} else {
					this.setState({ hasAddressAttempts: true });
				}
			})
		} else {
			$("#selectDiv").hide();
			this.setState({ isUK: false, showAddressLines: true }, () => {
				this._validatePostCode();
			});
		}

		rRegister.getCountryCode(countryISO)
			.done((response) => {
				this.setState({ countryCode: response.countryInfo.countryISO });
				document.getElementById("currency").value = response.countryInfo.currency;
			}).fail(() => {
				this.setState({ countryCode: $("#mobile_number").intlTelInput("getSelectedCountryData").dialCode });
		});
	}

	_enterAddress(e) {
		e.preventDefault();
		$("#selectDiv").hide();
		console.log("enter address");
		this.setState({ showAddressLines: true });
	}

	_findAddress(e) {
		e.preventDefault();

		let postCode = document.getElementById("post_code");
		if (postCode.value) {
			rRegister.getAddressDetails(postCode.value)
				.done((res) => {
					$("#selectDiv").show();
					let mapping = (data, i) => {
						return {
							addressId: i,
							county: data.county,
							line1: data.line1,
							line2: data.line2,
							line3: data.line3,
							locality: data.locality,
							town: data.town,
							fullAddress: data.line1 +
							(data.line2 ? ', ' + data.line2 : '') +
							(data.line3 ? ', ' + data.line3 : '') +
							' ' + data.county
						};
					};
					let mapResults = res.addressList.map(mapping);
					this.setState({ addressList: mapResults });

				})
				.fail((jqXHR, textStatus, errMsg) => {
					console.log(jqXHR, textStatus, errMsg);
					utils.addValidError(false, postCode, iMessages('postalCodeIncorrect'));
				});
		} else {
			this._validatePostCode();
		}

	}

	_login(username, password) {
		rAuthentication.login(username, password)
			.done(() => {
				window.location.href = '/en-gb/RegisterComplete';
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}

	_selectAddress(e) {
		e.preventDefault();
		let selectedAddress = this.state.addressList[e.target.value];
		console.log(selectedAddress);

		this.setState({ showAddressLines: true }, () => {
			document.getElementById("address_line1").value = selectedAddress.line1;
			document.getElementById("address_line2").value = selectedAddress.line2;
			document.getElementById("address_line3").value = selectedAddress.line3;
			document.getElementById("city").value = selectedAddress.county;
			$("#selectDiv").hide();
		});

	}

	_showPostcode(e) {
		e.preventDefault();
		$("#selectDiv").hide();
		this.setState({ showAddressLines: false });
	}


	/**********VALIDATION**********/

	_validateAddress(e) {
		if (e) {
			let target = e.target,
				res = rValidation.address(target);

			utils.addValidError(!res.msg, target, res.msg);
		} else {
			let addresses = ['address_line1', 'address_line2', 'address_line3', 'city'];
			const CHECKADDRESSES = (address) => {
				let target = document.getElementById(address),
					res = rValidation.address(target);

				utils.addValidError(!res.msg, target, res.msg);
			};
			addresses.map(CHECKADDRESSES);
		}
	}

	_validateDate(e) {

		if(e) {
			let target = e.target,
				res = rValidation.date(target);
			utils.validateDate(!res.msg, target);

		} else {
			let errCtr = 0;
			let dateStr = ['monthOB', 'dayOB', 'yearOB'];
			const CHECKDATE = (dateStr) => {
				let target = document.getElementById(dateStr),
					res = rValidation.date(target);
					errCtr = res.msg ? errCtr++ : errCtr;
				utils.validateDate((errCtr === 0), target, res.msg);
			};
			dateStr.map(CHECKDATE);

			//utils.validateDate((errCtr === 0), target, res.msg);
		}
	}

	_validateEmail() {
		let target = document.getElementById("email"),
			res = rValidation.email(target.value);

		if(res.msg) {
			utils.addValidError(!res.msg, target, res.msg);
		} else {
			rRegister.getDuplicateEmail(target.value)
				.done((res) => {
					utils.addValidError(!res.isExists, target, iMessages('emailDuplicate'));
				})
				.fail((jqXHR, textStatus, errMsg) => {
					console.log(jqXHR, textStatus, errMsg);
				});
		}
	}


	_validateName(e) {
		if(e) {
			let target = e.target,
				res = rValidation.name(target);

			utils.addValidError(!res.msg, target, res.msg);
		} else {
			let names = ['first_name', 'middle_name', 'last_name'];
			let checkNames = (name) => {
				let target = document.getElementById(name),
					res = rValidation.name(target);

				utils.addValidError(!res.msg, target, res.msg);
			};
			names.map(checkNames);
		}
	}


	_validateNationality() {
		let target = document.getElementById("nationality"),
			res = rValidation.nationality(target.value);

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateMobNum() {
		let target = document.getElementById("mobile_number"),
			res = rValidation.mobileNumber(target.value);


		if(res.msg) {
			utils.addValidError(!res.msg, target.parentElement, res.msg);
		} else {
			let mobNum = this.state.countryCode + target.value;
			rRegister.getDuplicateMobile(mobNum)
				.done((res) => {
					utils.addValidError(!res.isExists, target.parentElement, iMessages('mobileDuplicate'));
				})
				.fail((jqXHR, textStatus, errMsg) => {
					console.log(jqXHR, textStatus, errMsg);
				});
		}

	}


	_validatePassword() {
		let target = document.getElementById("reg_password"),
			res = rValidation.password(target.value);

		this.setState({ password: target.value });
		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateCPassword() {
		let target = document.getElementById("c_password"),
			res = rValidation.cPassword(target.value, this.state.password);

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validatePostCode() {
		let target = document.getElementById("post_code"),
			res = rValidation.postCode(target.value, this.state.isUK);

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateSecAnswer() {
		let target = document.getElementById("security_a"),
			res = rValidation.securityAnswer(target.value);

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateTitle() {
		let target = document.getElementById("title"),
			res = rValidation.title(target.value);

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateUsername() {
		let target = document.getElementById("reg_username"),
			res = rValidation.username(target.value);

		if(res.msg) {
			utils.addValidError(!res.msg, target, res.msg);
		} else {
			rRegister.getDuplicateUsername(target.value)
				.done((res) => {
					utils.addValidError(!res.isExists, target, iMessages('usernameDuplicate'));
				})
				.fail((jqXHR, textStatus, errMsg) => {
					console.log(jqXHR, textStatus, errMsg);
				});
		}
	}

	_validateFields() {
		this._validateAddress();
		this._validateDate();
		this._validateEmail();
		this._validateMobNum();
		this._validateName();
		this._validateNationality();
		this._validatePassword();
		this._validateCPassword();
		this._validatePostCode();
		this._validateSecAnswer();
		this._validateTitle();
		this._validateUsername();

		if ($('.input-msg-error').is(":visible")) {
			$('html, body').animate({
				scrollTop: $('.input-msg-error:visible:first').parent().offset().top
			}, 500);

		} else if (!document.getElementById("declaration").checked) {
			this.props.openModal({
				title: iCommon.error,
				msg: (
					<div>
						<p>{iMessages('over18Confirmation')}</p>
						<p>{iMessages('acceptTermsAndConditions')}</p>
					</div>
				)
			});
		} else {
			this.props.openModal({
				title: iCommon.success,
				msg: "All values are valid! Yay!",
				isConfirm: true
			});

			this._register();
		}
	}



	/**************END************/


	_redirectToHome() {
		location.replace(window.mainPage);
	}

	_submit(e) {
		e.preventDefault();

		if(!this.state.showAddressLines) {
			this.setState({ showAddressLines: true }, () => {
				this._validateFields();
			});
		} else {
			this._validateFields();
		}
	}

	_register() {
		let title = document.getElementById("title").value,
			firstName = utils.trim(document.getElementById("first_name").value),
			middleName = utils.trim(document.getElementById("middle_name").value),
			lastName = utils.trim(document.getElementById("last_name").value),
			monthOB = document.getElementById("monthOB").value,
			dayOB = document.getElementById("dayOB").value,
			yearOB = document.getElementById("yearOB").value,
			email = document.getElementById("email").value,
			nationality = document.getElementById("nationality").value,
			country = document.getElementById("country").value,
			addressLine1 = utils.trim(document.getElementById("address_line1").value),
			addressLine2 = utils.trim(document.getElementById("address_line2").value),
			addressLine3 = utils.trim(document.getElementById("address_line3").value),
			city = utils.trim(document.getElementById("city").value),
			postCode = document.getElementById("post_code").value,
			mobileNum = document.getElementById("mobile_number").value,
			username = document.getElementById("reg_username").value,
			password = document.getElementById("reg_password").value,
			securityQ = document.getElementById("security_q").value,
			securityA = document.getElementById("security_a").value,
			currency = document.getElementById("currency").value,
			marketingPref = document.getElementById("marketing_pref").checked ? 'Email|SMS|Post' : '',

			data = {
				Username: username,
				Password: password,
				SecurityQuestion: securityQ,
				SecurityAnswer: securityA,
				Title: title,
				FirstName: firstName,
				MiddleName: middleName,
				LastName: lastName,
				PostalCode: postCode,
				DateOfBirth: `${yearOB}-${monthOB}-${dayOB}`,
				MobileNumber: this.state.countryCode + mobileNum,
				Email: email,
				City: city,
				Country: country,
				Currency: currency,
				Nationality: nationality,
				AddressLine1: addressLine1,
				AddressLine2: addressLine2,
				AddressLine3: addressLine3,
				Introducer: '',
				Btag: '',
				Subscription: marketingPref,
				DepositDayLimit: 0,
				DepositWeekLimit: 0,
				DepositMonthLimit: 0,
				IovationBlackBox: typeof (ioGetBlackbox) !== 'undefined' ? ioGetBlackbox().blackbox : "",
				FirstPartyBlackBox: typeof (fpGetBlackbox) !== 'undefined' ? fpGetBlackbox().blackbox : "",
				isHousePlayer: this.state.isHousePlayer ? 'Y' : 'N'
			};

			console.log(data);

		rRegister.register(data)
			.done(() => {
				let tmpNewUser = { a: true };
				sessionStorage.tmpNewUser = JSON.stringify(tmpNewUser);

				// this.props.openModal({
				// 	title: iCommon.success,
				// 	msg: iMessages('regSuccess')//,
				// 	//closeCallback: this._login(data.Username, data.Password)
				// });
				this._login(data.Username, data.Password);

			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
				if (textStatus.code === "IovationDenied" || textStatus.code === "CVALDenied") { //to replace
					this.props.openModal({
						title: iCommon.error,
						msg: errMsg,
						closeCallback: this._redirectToHome
					});
				} else {
					console.log(jqXHR, textStatus, errMsg);
				}
			});
	}

	render() {

		let addressLines = '';

		if (this.state.showAddressLines) {
			addressLines = <div>
				<div className={`col-xs-10 ${styles.formGroup}`}>
					<Input
						type="text"
						label={`${iCommon('addressLine')} 1`}
						id="address_line1"
						maxLength={50}
						onBlur={this._validateAddress}
						placeholder={`${iCommon('addressLine')} 1*`}
						tooltipMessage={iMessages('tAddress1')}/>
				</div>
				<div className={`col-xs-10 ${styles.formGroup}`}>
					<Input
						type="text"
						label={`${iCommon('addressLine')} 2`}
						id="address_line2"
						maxLength={50}
						onBlur={this._validateAddress}
						placeholder={`${iCommon('addressLine')} 2`}/>
				</div>
				<div className={`col-xs-10 ${styles.formGroup}`}>
					<Input
						type="text"
						label={`${iCommon('addressLine')} 3`}
						id="address_line3"
						maxLength={50}
						onBlur={this._validateAddress}
						placeholder={`${iCommon('addressLine')} 3`}/>
				</div>
				<div className={`col-xs-10 ${styles.formGroup}`}>
					<Input
						type="text"
						label={iCommon('city')}
						id="city"
						maxLength={50}
						onBlur={this._validateAddress}
						placeholder={`${iCommon('city')}*`}
						tooltipMessage={iMessages('tCity')}/>
				</div>
			</div>
		}

		let isPcode = '';

		if (this.state.isUK) {
			if (this.state.showAddressLines) {
				isPcode = <div className={`col-xs-10 ${styles.formGroup} ${styles.addTop}`}>
					<a href="" className="pull-right" onClick={this._showPostcode}>
						{iMessages('searchPostCode')}
					</a>
				</div>
			}
			else {
				isPcode = <div className={`col-xs-10 ${styles.formGroup} ${styles.addTop}`}>
					<a href="" className="pull-right" onClick={this._enterAddress}>
						{iMessages('enterManually')}
					</a>
				</div>
			}
		}

		let pCodeButton = '';

		if (this.state.isUK && !this.state.showAddressLines && this.state.hasAddressAttempts) {
			pCodeButton = <div className={`col-xs-2 ${styles.searchPostButton}`}>
				<i className="fa fa-search" onClick={this._findAddress}/>
			</div>
		}


		return (
			<div className={styles.registerPage}>

				<h2 className="mainTitle">{iCommon('fOpenAccount')}</h2>
				<h4>WELCOME TO {`${window.siteName}`}!</h4>
				<p>{iMessages('introPar')}</p>

				<div className={styles.accountForm}>
					<div className="col-xs-6">
						<FormContainer
							title={iCommon('pDetails')}
							noOverflow>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Select
									id="title"
									label={iCommon('title')}
									options={enums.titles}
									tooltipMessage={iMessages('tTitle')}
									onChange={this._validateTitle}
									pKey="id"
									value="text"/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('firstName')}
									id="first_name"
									placeholder={`${iCommon('firstName')}*`}
									maxLength={30}
									onBlur={this._validateName}
									tooltipMessage={iMessages('tFirstName')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('middleName')}
									id="middle_name"
									placeholder={iCommon('middleName')}
									maxLength={30}
									onBlur={this._validateName}
									tooltipMessage={iMessages('tMiddleName')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('lastName')}
									id="last_name"
									placeholder={`${iCommon('lastName')}*`}
									maxLength={30}
									onBlur={this._validateName}
									tooltipMessage={iMessages('tLastName')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<label>{iCommon('dateOfBirth')}</label>
								<div className="row">
									<div className="col-xs-4">
										<Select
											id="dayOB"
											options={enums.dayOB}
											tooltipMessage={iMessages('tBirthDate')}
											onChange={this._validateDate}
											pKey="id"
											value="text"/>
									</div>
									<div className="col-xs-4">
										<Select
											id="monthOB"
											options={enums.monthOB}
											tooltipMessage={iMessages('tBirthDate')}
											onChange={this._validateDate}
											pKey="id"
											value="text"/>
									</div>
									<div className="col-xs-4">
										<Select
											id="yearOB"
											options={enums.yearOB}
											tooltipMessage={iMessages('tBirthDate')}
											onChange={this._validateDate}
											pKey="id"
											value="text"/>
									</div>
								</div>
								<span className="input-msg-error display-none bdate-err-msg">
									{iMessages('bDateRequired')}
									{iMessages('below18')}
								</span>
							</div>
							<div className={`col-xs-2 ${styles.icon}`}>
								<img src={window.cmsMedia("Content/images/icons/18-icon.png")}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="email"
									label={iCommon('email')}
									id="email"
									onBlur={this._validateEmail}
									placeholder={`${iCommon('email')}*`}
									tooltipMessage={iMessages('tEmail')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Select
									label={iCommon('nationality')}
									id="nationality"
									placeholder={`${iCommon('nationality')}*`}
									tooltipMessage={iMessages('tNationality')}
									onChange={this._validateNationality}
									options={this.state.nationalities}
									pKey="code"
									value="name"/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Select
									label={iCommon('country')}
									id="country"
									options={this.state.countries}
									pKey="code"
									value="name"
									onChange={this._checkCountry}/>
							</div>
							{addressLines}
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('postcode')}
									id="post_code"
									maxLength={10}
									onBlur={this._validatePostCode}
									placeholder={`${iCommon('postcode')}*`}
									tooltipMessage={iMessages('tPostCode')}/>
							</div>

							{pCodeButton}

							<div id="selectDiv" className={`col-xs-10 display-none ${styles.formGroup} ${styles.selectDiv}`}>
								<Select
									id="select_address"
									placeholder={iCommon('selAddress')}
									options={this.state.addressList}
									onChange={this._selectAddress}
									pKey="addressId"
									value="fullAddress"/>
							</div>

							{isPcode}

							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('mobileNumber')}
									id="mobile_number"
									maxLength={15}
									onBlur={this._validateMobNum}
									placeholder={`${iCommon('mobileNumber')}*`}
									tooltipMessage={iMessages('tMobNum')}/>
							</div>
						</FormContainer>
					</div>
					<div className="col-xs-6">
						<FormContainer title={iCommon('lDetails')}>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('username')}
									id="reg_username"
									maxLength={12}
									onBlur={this._validateUsername}
									placeholder={`${iCommon('username')}*`}
									tooltipMessage={iMessages('tUsername')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="password"
									label={iCommon('password')}
									id="reg_password"
									onBlur={this._validatePassword}
									placeholder={`${iCommon('password')}*`}
									tooltipMessage={iMessages('tPassword')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="password"
									label={iCommon('confirmPassword')}
									id="c_password"
									onBlur={this._validateCPassword}
									placeholder={`${iCommon('confirmPassword')}*`}
									tooltipMessage={iMessages('tPassConfirm')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Select
									id="security_q"
									label={iCommon('securityQuestion')}
									options={enums.securityQuestion}
									pKey="id"
									value="text"
									tooltipMessage={iMessages('tSecurityQ')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Input
									type="text"
									label={iCommon('securityAnswer')}
									id="security_a"
									onBlur={this._validateSecAnswer}
									placeholder={`${iCommon('securityAnswer')}*`}
									tooltipMessage={iMessages('tSecurityA')}/>
							</div>
							<div className={`col-xs-10 ${styles.formGroup}`}>
								<Select
									label={iCommon('bettingCurrency')}
									id="currency"
									placeholder={`${iCommon('bettingCurrency')}*`}
									tooltipMessage={iMessages('tCurrency')}
									options={this.state.currencies}
									pKey="code"
									value="name"/>
							</div>
							<div className={`col-xs-12 ${styles.formGroup}`}>
								<Input
									type="checkbox"
									label={iCommon('marketingPreferences')}
									labelClassName="disBlock"
									id="marketing_pref"
									defaultChecked>
									<span> I would like to receive information about offers and promotions for BetVision.</span>
								</Input>
							</div>
						</FormContainer>
					</div>
					<div className="col-xs-12">
						<FormContainer id={styles.decContainer} title={iCommon('declaration')}>
							<div className={`col-xs-12 ${styles.formGroup}`}>
								<Input
									type="checkbox"
									id="declaration">
									<p className={styles.declaP}> * I confirm that I am 18 or over and that I've read
										and accept the <Link to={`/${window.cultureCode}/terms`}>Terms and
											Conditions</Link>.</p>
								</Input>
								<p>
									*By clicking 'Submit' I agree that I have read and accepted the terms and
									conditions, privacy policy and betting rules as published on this site.
								</p>
								<p>
									*The personal information that you provide must be complete and accurate to have a
									hassle-free verification and withdrawal transactions.
								</p>
								<BtnGreen onClick={this._submit} className="pull-right">
									SUBMIT
								</BtnGreen>
							</div>
						</FormContainer>
					</div>
				</div>
			</div>
		);
	}
}

export default BaseComponent(Register);