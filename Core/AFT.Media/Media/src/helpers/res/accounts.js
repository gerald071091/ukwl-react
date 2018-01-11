/**
 * Created by isabella.inosantos on 5/9/2017.
 */

import rego from '../rego';

class Account{
    getTnc() {
        return $.get(window.tncUrl);
    }

    acceptTnc() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/updatetncstatus',
            type: 'POST'
        });
    }

    details() {
        return rego.ajax({
            type: 'GET',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/my-details',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    depositLimits() {
        return rego.ajax({
            type: 'GET',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/deposit-limits',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    setDepositLimits(dayLimit, weekLimit, monthLimit) {
        return rego.ajax({
            type: 'POST',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/deposit-limits',
            data: {
                dayLimit: dayLimit,
                weekLimit: weekLimit,
                monthLimit: monthLimit
            },
            dataType: 'json'
        });
    }

    confirmDepositLimit() {
        return rego.ajax({
            type: 'POST',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/deposit-limit/confirm',
            dataType: 'json'
        });
    }

    cancelDepositLimit() {
        return rego.ajax({
            type: 'POST',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/deposit-limit/cancel',
            dataType: 'json'
        });
    }

    getDPLimitInfo() {
        return rego.ajax({
            type: 'POST',
            url: '/api/' + window.cultureCode + '/payment/get-deposit-page-limit-info',
            dataType: 'json'
        });
    }
}

export default new Account();