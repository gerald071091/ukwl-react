/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class ContactUs {

    sendQuery (data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/send-query',
            type: 'post',
            data: data
        });
    }

}

export default new ContactUs();