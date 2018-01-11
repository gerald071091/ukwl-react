/**
 * Created by gian.jamisola on 6/6/2017.
 */

import iMessages from './messages';
import validation from 'helpers/validation'

export default {
    amount: (data, balance) => {
        const MINLEN = 1;
        let errMsg = '';

        if(!data) {
            errMsg = iMessages('v_amount_required');
        }

        if(!validation.isDecimal(data)) {
            errMsg = iMessages('v_amount_isNumber');
        }

        if(data > balance){
            errMsg = iMessages('v_amount_greaterThenBalance');
        }

        if(!validation.isValueRangeValid(data, MINLEN)){
            errMsg = iMessages('v_amount_invalid');
        }

        return errMsg;
    },
    wpCardExpDate: (data) => {
        const MINLEN = 2,
            MAXLEN = 2;
        let errMsg = '';

        if(!data.value) {
            errMsg = data.id === 'expdateMM' ? iMessages('v_worldPay_expMM_required') : iMessages('v_worldPay_expYY_required');
        }

        if(!validation.isNumeric(data.value) || !validation.isLengthRangeValid(data.value, MINLEN, MAXLEN)) {
            errMsg = data.id === 'expdateMM' ? iMessages('v_worldPay_expMM_required') : iMessages('v_worldPay_expYY_pattern');
        }

        return errMsg;

    },
    wpCVV: (data) => {
        const MINLEN = 3,
            MAXLEN = 3;
        let errMsg = '';

        if(!data.value) {
            errMsg = iMessages('v_worldPay_cvv_reqired');
        }

        if(!validation.isNumeric(data.value) || !validation.isLengthRangeValid(data.value, MINLEN, MAXLEN)) {
            errMsg = iMessages('v_worldPay_cvv_pattern');
        }

        return errMsg;
    }
}