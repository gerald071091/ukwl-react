/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Register {

    register (data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/signup',
            dataType: 'json',
            type: 'POST',
            data: data
        });
    }

    getCountryCode (countryISO) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/GetDefaultCountryValues/' + countryISO,
            dataType: 'json',
            type: 'GET'
        });
    }

    getAddressDetails (data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/GetAddress/' + data,
            dataType: 'json',
            type: 'GET'
        });
    }

    getAddressAPIAttempts () {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/GetAddressUsage',
            dataType: 'json',
            type: 'GET'
        });
    }

    getDuplicateUsername (username) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/isUsernameExist',
            dataType: 'json',
            type: 'POST',
            data: {
                loginName: username
            }
        });
    }

	getDuplicateEmail (email) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/isEmailaddressExist',
            dataType: 'json',
            type: 'POST',
            data: {
	                emailAddress: email
	            }
        });
    }

    getDuplicateMobile (mobile) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/isMobileNumberExist',
            dataType: 'json',
            type: 'POST',
            data: {
                mobileNumber: mobile
            }
        });
    }

    getCountryByIP () {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/GetCountryCodeByIp',
            dataType: 'json',
            type: 'GET'
        });
    }

}

export default new Register();
