/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Balances {
    walletBalances (product){
        return rego.ajax({
            type: 'GET',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/wallet',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    availableBalances (product){
        return rego.ajax({
            type: 'GET',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/available-balances',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    bonusBalances (product){
        return rego.ajax({
            type: 'GET',
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/bonus-balances',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }
}

export default new Balances();