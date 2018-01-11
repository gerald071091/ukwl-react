/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Promotions {

    getPromotions() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/promotions',
            dataType: 'json',
            type: 'Get'
        });
    }

    getPromotionDetail (id) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/promotions/' + id,
            dataType: 'json',
            type: 'GET'
        });
    }

    getPromotionByBonusCode (bonusCode) {
        return rego.ajax({
                url: '/' + window.apiMethod + '/' + window.cultureCode + '/promotions/' + bonusCode,
                dataType: 'json',
                type: 'GET'
            });
    }

}

export default new Promotions();