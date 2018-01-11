/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Sportsbook {

    getSbtechUrl (IsMobile) {
        let isMobile = IsMobile;
        if(isMobile === undefined || isMobile === null){
            isMobile = false;
        }

        let api = (isMobile) ? '/mapi/' : '/api/';

        return rego.ajax({
            url: api + window.cultureCode + '/sbtech/url',
            dataType: 'json',
            type: 'GET'
        });
    }

}

export default new Sportsbook();