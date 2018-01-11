/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import BaseComponent from 'base-component';

import rForgotPassword from 'res/forgotPassword';
import validation from './validation';
import utils from 'helpers/utils';
import iCommon from 'nls/common';
import iMessages from './messages';

import {BtnRed} from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import Input from 'comp/Input';

import styles from './lostpassword.scss';

class LostPassword extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._submit = this._submit.bind(this);
		this._validateEmail = this._validateEmail.bind(this);
		this._validateUsername = this._validateUsername.bind(this);
	}

	state = {
		errMessages: []
	}


	componentDidMount() {
		this.props.getText('sidebarHelp', "Lost Password");
	}

	_validateEmail() {
		let target = document.getElementById("lp_email"),
			res = validation.email(target.value),
			err = this.state.errMessages;

		if(res.msg) {
			let filtered = err.filter((data) => {
				return data.id !== res.id;
			});
			filtered.push(res);
			this.setState({ errMessages: filtered });
		} else {
			let filtered = err.filter((data) => {
				return data.id !== res.id;
			});
			this.setState({ errMessages: filtered });
		}

		utils.addValidError(!res.msg, target, res.msg);
	}

	_validateUsername() {
		let target = document.getElementById("lp_username"),
			res = validation.username(target.value),
			err = this.state.errMessages;

		if(res.msg) {
			let filtered = err.filter((data) => {
				return data.id !== res.id;
			});
			filtered.push(res);
			this.setState({ errMessages: filtered });
		} else {
			let filtered = err.filter((data) => {
				return data.id !== res.id;
			});
			this.setState({ errMessages: filtered });
		}

		utils.addValidError(!res.msg, target, res.msg);

	}

	_submit(e) {
		e.preventDefault();

		// setTimeout(() => {
		// 	this._validateEmail();
		// 	this._validateUsername();
		// }, 1000);


		if(this.state.errMessages.length > 0) {
			let retMsg = (
				<div>
					{
						this.state.errMessages.map((data, i) => {
							return (
								<p key={i}>{data.msg}</p>
							)
						})
					}
				</div>
			);

			this.props.openModal({ title: "Error", msg: retMsg });
		} else {

			let username = document.getElementById("lp_username").value,
				email = document.getElementById("lp_email").value;

			rForgotPassword.sendEmail(username, email)
				.done(() => {
					this.props.openModal({ title: "Success", msg: iMessages('success') });
					window.location.replace(window.mainPage);
				})
				.fail((jqXHR, textStatus, errMsg) => {
					this.props.openModal({ title: "Error", msg: errMsg });
				});
		}
	}

	render() {
		return (
			<div className={styles.lostPasswordPage}>
				<h2 className="mainTitle">{iCommon('fLostPassword')}</h2>
				<p>
					Forgot your password? Use any of the options below to reset your password.
				</p>

				<FormContainer title="Option 1">
					<div className="row">
						<div className={`col-xs-6 ${styles.formGroup}`}>
							<Input
								id="lp_username"
								type="text"
								placeholder={iMessages('pLoginName')}
								onBlur={this._validateUsername}
							/>
						</div>
						<div className={`col-xs-6 ${styles.formGroup}`}>
							<Input
								id="lp_email"
								type="text"
								placeholder={iMessages('pEmail')}
								onBlur={this._validateEmail}
							/>
						</div>
					</div>
					<BtnRed className="col-xs-6" text="Send" onClick={this._submit} />
				</FormContainer>
				<FormContainer title="Option 2">
					<p>
						You may send an email to our Customer Service Team at <a href="mailto:support@betvision.com">{window.supportEmail}</a>
					</p>
				</FormContainer>
			</div>
		);
	}
}

export default BaseComponent(LostPassword);