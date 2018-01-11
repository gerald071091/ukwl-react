/**
 * Created by gian.jamisola on 6/6/2017.
 */

import iMessages from './messages';
import validation from 'helpers/validation'

export default {
    firstName: (data) => {
        const MAXLEN = 50;
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvFirstNameRequired');
        }

        if(validation.isLengthBigger(data, MAXLEN)) {
            errMsg = iMessages('fvFirstNameLength');
        }

        if(!validation.isFirstCharAlpha(data)) {
            errMsg = iMessages('fvFirstNameAlphabetic');
        }

        return errMsg;
    },
    lastName: (data) => {
        const MAXLEN = 20;
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvLastNameRequired');
        }

        if(validation.isLengthBigger(data, MAXLEN)) {
            errMsg = iMessages('fvLastNameLength');
        }

        if(!validation.isFirstCharAlpha(data)) {
            errMsg = iMessages('fvLastNameAlphabetic');
        }

        return errMsg;
    },
    telephone: (data) => {
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvTelephoneRequired');
        }

        if(!validation.isTelephoneValid(data)) {
            errMsg = iMessages('fvTelephoneFormatIncorrect');
        }

        return errMsg;
    },
    email: (data) => {
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvEmailRequired');
        }

        if(!validation.isEmailValid(data)) {
            errMsg = iMessages('fvEmailFormatIncorrect');
        }

        return errMsg;
    },
    content: (data) => {
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvContent');
        }

        return errMsg;
    },
    subject: (data) => {
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('fvSubject');
        }

        return errMsg;
    },
}