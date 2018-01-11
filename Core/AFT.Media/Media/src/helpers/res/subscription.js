/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Subscription {

    getSubscriptions () {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/getsubscription',
            type: 'get',
            dataType: 'json'
        });
    }

    setSubscription (email, sms, post) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/setsubscription/' + email + "/" + sms + "/" + post,
            dataType: 'json',
            type: 'POST'
        });
    }

}

export default new Subscription();