/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Bonuses {

    bettingBalances(){
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/bonus-betting-balances',
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    claimBonus (product, bonusCode) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/claim-bonus/' + bonusCode,
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    histories (product, status, from, to, page, pageSize) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/bonus-histories',
            data: {
                status: status,
                from: from,
                to: to,
                page: page,
                pageSize: pageSize
            },
            type: 'get',
            dataType: 'json'
        });
    }

}

export default new Bonuses();