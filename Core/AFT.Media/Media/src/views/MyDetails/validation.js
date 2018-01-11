/**
 * Created by gian.jamisola on 6/6/2017.
 */

import iMessages from './messages';
import validation from 'helpers/validation'

export default {
    password: (data) => {
        const MINLEN = 6,
            MAXLEN = 20;
        let err = '';

        if(!data) {
            err = iMessages('fvCheckAllFieldsArePopulated');
        }

        if(!validation.isLengthRangeValid(data, MINLEN, MAXLEN)) {
            err = iMessages('passwordLengthError');
        }

        return err;
    },
    newPWValidation: (data, oldPW, errMsg) => {
        let err = errMsg || '';

        if(data === oldPW) {
            err = iMessages('passwordsEqualOldPassword');
        }

        return err;
    },
    confirmPWValidation: (data, newPW, errMsg) => {
        let err = errMsg || '';

        if((data !== newPW)) {
            err = iMessages('passwordsDoNotMatch');
        }

        return err;
    }
}