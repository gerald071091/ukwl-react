/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';
import Payments from './payments';

class Withdrawal extends Payments {

    netellerDetails(){
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/neteller/details',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    netellerWithdraw(data){
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/neteller/withdraw',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    skrillDetails () {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/skrill/details',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    skrillWithdraw(data){
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/skrill/withdraw',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

    worldPayDetails () {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/details',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    worldPayWithdraw(data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/payment/worldpay/withdraw',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data)
        });
    }

}

export default new Withdrawal();