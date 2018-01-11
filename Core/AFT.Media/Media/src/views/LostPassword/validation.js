/**
 * Created by isabella.inosantos on 5/25/2017.
 */

import iMessages from 'helpers/nls/messages';
import validation from 'helpers/validation';

export default {

	username: (data) => {
		let errMsg = '';
		let pattern = /^([\u4e00-\u9fa5A-Za-z.]+)$/;
		if(!pattern.test(data)) {
			errMsg = iMessages('fvUsernameAlphanumeric');
		}
		if(!data) {
			errMsg = iMessages('fvUsernameRequired');
		}

		return {id: "username", msg: errMsg};
	},

	email: (data) => {
		let errMsg = '';

		if(!validation.isEmailValid(data)) {
			errMsg = iMessages('fvEmailFormatIncorrect');
		}

		if(!data) {
			errMsg = iMessages('fvEmailRequired');
		}

		return {id: "email", msg: errMsg};
	}
}