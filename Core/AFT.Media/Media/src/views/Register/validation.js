/**
 * Created by isabella.inosantos on 5/25/2017.
 */

import iMessages from './messages';
import validation from 'helpers/validation'

export default {

	address: (data) => {
		let errMsg = '';
		// eslint-disable-next-line no-useless-escape
		let pattern = /^[a-zA-Z0-9]+([.;:\/,&'()-]{0,2}[ a-zA-Z0-9]*)*$/,
			min = 2;

		if(!data.value) {
			let addReq = {
				"address_line1": iMessages('addressRequired'),
				"city": iMessages('cityRequired')
			};

			errMsg = addReq[data.id] || '';

		} else {
			if(!pattern.test(data.value)) {
				errMsg = iMessages('addressPattern');
			}

			if(validation.isLengthSmaller(data.value, min)) {
				errMsg = iMessages('addressLength');
			}
		}
		return {id: data.id, msg: errMsg};
	},

	date: (data) => {
		let errMsg = data.value === "0" ? iMessages('bDateRequired') : '';

		return {id: data.id, msg: errMsg};
	},

	email: (data) => {
		let errMsg = '';

		if(!validation.isEmailValid(data)) {
			errMsg = iMessages('emailInvalidInput');
		}

		if(!data) {
			errMsg = iMessages('emailRequired');
		}
		return {id: "email", msg: errMsg};
	},

	name: (data) => {
		let errMsg = '';
		// eslint-disable-next-line no-useless-escape
		let pattern = /^([\u4e00-\u9fa5a-zA-Z]+([\'-]{0,1}[\u4e00-\u9fa5a-zA-Z]+)*[ ]*)*$/,
			min = 2;
		let requiredMsg = {
			'first_name': iMessages('firstNameRequired'),
			'last_name': iMessages('lastNameRequired'),
			'middle_name': ''
		};

		if(!data.value) {
			errMsg = requiredMsg[data.id];
		} else {
			if(!pattern.test(data.value)) {
				errMsg = iMessages('namePattern');
			}

			if(validation.isLengthSmaller(data.value, min)) {
				errMsg = iMessages('nameMinLength');
			}
		}

		return {id: data.id, msg: errMsg};

	},

	mobileNumber: (data) => {
		let errMsg = '',
			min = 8;

		if(validation.isLengthSmaller(data, min)) {
			errMsg = iMessages('mobileMinLength');
		}

		if(!validation.isNumeric(data)) {
			errMsg = iMessages('mobileInvalidInput');
		}

		if (!data) {
			errMsg = iMessages('mobileRequired');
		}

		return { id: "mobile", msg: errMsg };
	},

	nationality: (data) => {
		let errMsg = data === '-' ? iMessages('nationalityRequired') : '';

		return { id: "nationality", msg: errMsg };
	},

	password: (data) => {
		let errMsg = '',
			min = 6;
		if(validation.isLengthSmaller(data, min)) {
			errMsg = iMessages('passwordLength');
		}

		if (!data) {
			errMsg = iMessages('passwordRequired');
		}

		return { id: "password", msg: errMsg };

	},

	cPassword: (data, password) => {
		let errMsg = '';
		if(data !== password) {
			errMsg = iMessages('passwordsDoNotMatch');
		}

		if (!data) {
			errMsg = iMessages('passwordRequired');
		}

		return { id: "cPassword", msg: errMsg };

	},

	postCode: (data, isUK) => {
		let errMsg = (!data && isUK) ? iMessages('postalCodeRequired') : '';
		return { id: "postcode", msg: errMsg };
	},

	securityAnswer: (data) => {
		let errMsg = data ? '' : iMessages('secAnswerRequired');
		return { id: "secAnswer", msg: errMsg };
	},

	title: (data) => {
		let errMsg = data === "0" ? iMessages('titleRequired') : '';
		return { id: "title", msg: errMsg };
	},

	username: (data) => {
		let errMsg = '',
			pattern = /^([A-Za-z0-9.]+)$/,
			min = 6;

		if(!pattern.test(data)) {
			errMsg = iMessages('usernamePattern');
		}

		if(validation.isLengthSmaller(data, min)) {
			errMsg = iMessages('usernameLength');
		}

		if(!data) {
			errMsg = iMessages('usernameRequired');
		}

		return {id: "username", msg: errMsg};
	}
}