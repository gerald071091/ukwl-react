/**
 * Created by gian.jamisola on 5/3/2017.
 */

import rego from '../rego';

class Authentication {

    login (userName, pwd, rLog) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/Login',
            dataType: 'json',
            type: 'POST',
            data: {
                Username: userName,
                Password: pwd,
                Platform: window.isMobile ? "Mobile" : "Desktop",
                RememberMe: rLog,
                IovationBlackBox: typeof (ioGetBlackbox) !== 'undefined' ? ioGetBlackbox().blackbox : "",
                FirstPartyBlackBox: typeof (fpGetBlackbox) !== 'undefined' ? fpGetBlackbox().blackbox : "",
            }
        });
    }

    logout() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/logout',
            dataType: 'json',
            type: 'POST'
        });
    }

    authCheck() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/authenticated',
            dataType: 'json',
            type: 'GET'
        });
    }

    loginByToken (token) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/loginbytoken',
            dataType: 'json',
            type: 'POST',
            data: {
                token: token,
                Platform: window.isMobile ? "Mobile" : "Desktop",
                IovationBlackBox: typeof (ioGetBlackbox) !== 'undefined' ? ioGetBlackbox().blackbox : "",
                FirstPartyBlackBox: typeof (fpGetBlackbox) !== 'undefined' ? fpGetBlackbox().blackbox : "",
            }
        });
    }
}

export default new Authentication();