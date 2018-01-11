/**
 * Created by gian.jamisola on 5/3/2017.
 */

import rego from '../rego';
import Payments from './payments';

class Deposit extends Payments {

    netellerDeposit(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/neteller/deposit',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    skrillDeposit(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/skrill/deposit-url',
            contentType: 'application/json; charset=utf-8',
            type: 'get',
            dataType: 'json',
            data: data
        });
    }

    skrillOneTapUrl(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/skrill/onetap-deposit',
            contentType: 'application/json; charset=utf-8',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    skrillStatus(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/skrill/deposit-status',
            contentType: 'application/json; charset=utf-8',
            type: 'get',
            dataType: 'json',
            data: data
        });
    }

    worldpayDeposit(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/deposit',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    worldpayFastpayDetails() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/getfastpayinfo',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    worldPayFastpayDeposit(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/depositbyfastpay',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    creditCardReset() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/reset',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }
}

export default new Deposit();