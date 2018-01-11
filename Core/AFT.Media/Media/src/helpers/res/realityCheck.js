/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class RealityCheck {

    setRealityCheck (data) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/set-reality-check-time',
            dataType: 'json',
            type: 'POST',
            data: {
                RealityAlertCheckTime: data
            }
        });
    }

    getRealityCheck() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/get-reality-check-time',
            dataType: 'json',
            type: 'GET'
        });
    }

}

export default new RealityCheck();