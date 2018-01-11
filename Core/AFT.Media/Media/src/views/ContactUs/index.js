/**
 * Created by gian.jamisola on 5/9/2017.
 */

import React from 'react';

import BaseComponent from 'base-component';
import {BtnRed} from 'comp/Button';
import Input from 'comp/Input';
import FormContainer from 'comp/FormContainer';

import iCommon from './common';
import iMessages from './messages';
import validation from './validation';
import utils from 'helpers/utils';

import rContactUs from 'res/contactUs';

class ContactUs extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._validateFName = this._validateFName.bind(this);
		this._validateLName = this._validateLName.bind(this);
		this._validateSubject = this._validateSubject.bind(this);
		this._validateTelephone = this._validateTelephone.bind(this);
		this._validateEmail = this._validateEmail.bind(this);
		this._validateAddressLine = this._validateAddressLine.bind(this);
		this._validateFields = this._validateFields.bind(this);
	}

	state = {
		errorArray: []
	};

	componentDidMount() {
		this.props.getText('sidebarInfo', "Contact Us");
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextState.errorArray !== this.state.errorArray
		);
	}

	_validateFName(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('firstName'),
			errorMsg = validation.firstName(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateLName(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('lastName'),
			errorMsg = validation.lastName(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateSubject(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('subject'),
			errorMsg = validation.subject(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateTelephone(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('telephone'),
			errorMsg = validation.telephone(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateEmail(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('email'),
			errorMsg = validation.email(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateAddressLine(e) {
		let target = typeof e !== 'undefined' ? e.target : document.getElementById('addressLine'),
			errorMsg = validation.content(target.value)

		utils.addValidError(!errorMsg, target);

		return errorMsg;
	}

	_validateFields() {
		let tmpArray = [];

		this._validateFName() && tmpArray.push(this._validateFName());
		this._validateLName() && tmpArray.push(this._validateLName());
		this._validateSubject() && tmpArray.push(this._validateSubject());
		this._validateTelephone() && tmpArray.push(this._validateTelephone());
		this._validateEmail() && tmpArray.push(this._validateEmail())
		this._validateAddressLine() && tmpArray.push(this._validateAddressLine());

		if(tmpArray.length > 0) {
			let tmp = tmpArray.map((errMsg, key) => {
				return (
					<p key={key}>{errMsg}</p>
				)
			});

			this.props.openModal({
				title: iCommon('cError'),
				msg: tmp
			});
		} else {
			this._submit();
		}
	}

	_submit(e) {
		e.preventDefault();

		let firstName = document.getElementById('firstName').value,
			lastName = document.getElementById('lastName').value,
			email = document.getElementById('email').value,
			subject = document.getElementById('subject').value,
			addressLine = document.getElementById('addressLine').value,
			telephone = document.getElementById('telephone').value,

		data = {
			FirstName: firstName,
			LastName: lastName,
			Telephone: telephone,
			Email: email,
			Subject: subject,
			Content: addressLine
		};

		rContactUs.sendQuery(data)
			.done(() => {
				this.props.openModal({
					msg: iMessages('querySent'),
					title: iCommon('cSuccess')
				});
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					msg: errMsg,
					title: iCommon('cError')
				});
			});
	}

	render() {
		return(
			<div>
				<h2 className="mainTitle">{iCommon('headerTitle')}</h2>
				<div dangerouslySetInnerHTML={{__html: iCommon('description')}}></div>


				<FormContainer title="SEND US YOUR QUERY">
						<div className="row form__body">
							<div className="col-xs-6">
								<div className="form-group">
									<Input
										id="firstName"
										type="text"
										className="form-control"
										placeholder="First Name"
										required
										onBlur={this._validateFName} />
								</div>
								<div className="form-group">
									<Input
										id="telephone"
										type="text"
										className="form-control"
										placeholder="Telephone"
										required
										onBlur={this._validateTelephone} />
								</div>
								<div className="form-group">
									<Input
										id="subject"
										type="text"
										className="form-control"
										placeholder="Subject"
										required
										onBlur={this._validateSubject} />
								</div>
							</div>
							<div className="col-xs-6">
								<div className="form-group">
									<Input
										id="lastName"
										type="text"
										className="form-control"
										placeholder="Last Name"
										required
										onBlur={this._validateLName} />
								</div>
								<div className="form-group">
									<Input
										id="email"
										type="text"
										className="form-control"
										placeholder="Email"
										required
										onBlur={this._validateEmail} />
								</div>
								<div className="form-group">
									<textarea
										id="addressLine"
										className="address-line form-control"
										name="Address_Line"
										placeholder="Please enter your message"
										onBlur={this._validateAddressLine}
										required></textarea>
								</div>
								<div className="form-group account-form">
									<BtnRed text={iCommon('cSubmit')} onClick={this._validateFields}/>
								</div>
							</div>
						</div>
				</FormContainer>
			</div>

		);
	}
}

export default BaseComponent(ContactUs);