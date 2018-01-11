/**
 * Created by bernard.molina on 5/9/2017.
 */
import React from 'react';

import HeaderOne from './HeaderOne';
import rAuthentication from 'res/authentication';
import rAccount from 'res/accounts';

import iCommon from 'nls/common';
import BaseComponent from 'base-component';

class Header extends React.Component {
	static propTypes = {
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		path: React.PropTypes.string

	};

	constructor(props){
		super(props);

		this._acceptTnc = this._acceptTnc.bind(this);
		this._getTnc = this._getTnc.bind(this);
		this._login = this._login.bind(this);
		this._logout = this._logout.bind(this);
	}

	_acceptTnc() {
		rAccount.acceptTnc().always(() => {
			this.props.closeModal();
			location.replace(window.mainPage);
		});
	}

	_getTnc() {
		$.ajax({
			url: `${window.cmsMedia("Content/static-pages/termsAndconditions.html")}`,
			dataType: 'html',
			type: 'GET'
		}).done((res) => {
			console.log(res);

			const TNC = (
				<div className="tnc" dangerouslySetInnerHTML={{ __html: res}} />
			);

			this.props.openModal({
				title: "Terms and Conditions",
				msg: TNC,
				okCallback: this._acceptTnc
			});
		});
	}

	_login(username, password){
		this.props.openModal({
			showLoader: true
		});
		rAuthentication.login(username, password)
			.done((res)=> {

				if(!res.hasReadTerms) {
					this._getTnc();
				} else {
					this.props.closeModal();
					location.replace(window.mainPage);
				}

			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					title: iCommon('cError'),
					msg: <div dangerouslySetInnerHTML={{__html: errMsg}}></div>
				});
			});
	}

	_logout(){
		this.props.openModal({
			showLoader: true
		});
		rAuthentication.logout()
			.done(() => {
				this.props.closeModal();
				location.replace(window.mainPage);
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.props.openModal({
					title: iCommon('cError'),
					msg: <div dangerouslySetInnerHTML={{__html: errMsg}}></div>
				});
			});
	}


	render() {

		return(
			<HeaderOne
				data={this._login}
				logout={this._logout}
				path={this.props.path}/>
		);
	}
}

export default BaseComponent(Header)

