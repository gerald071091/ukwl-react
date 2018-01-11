/**
 * Created by gian.jamisola on 5/3/2017.
 */

import rego from '../rego';

class Payments {
    lastExecuted() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/last-executed',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    methodsAvailable() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/methods',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    histories(type, from, to, page, pageSize) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/histories',
            type: 'get',
            data: {
                    type: type,
                    from: from,
                    to: to,
                    page: page,
                    pageSize: pageSize
                },
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    bonusStatusUponWithdrawal() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/bonus-status-upon-withdrawal',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    getPerTransactionDepositLimits(data) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/payment/transaction-deposit-limits',
            type: 'post',
            dataType: 'json',
            data: data,
            async: false
        });
    }

    getPerTransactionWithdrawalLimits(data) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/payment/transaction-withdraw-limits',
            type: 'post',
            dataType: 'json',
            data: data,
            async: false
        });
    }

    getPublicDepositLimits(data) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/payment/public-transaction-deposit-limits',
            type: 'post',
            dataType: 'json',
            data: data,
            async: false
        });
    }


}

export default Payments;