/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Util {
    getCountries() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/countries',
            dataType: 'json',
            type: 'GET',
        });
    }

    getCurrencies() {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/currencies',
            dataType: 'json',
            type: 'GET',
        });
    }

    getDecimalConversion(decimal, precision) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/convert-decimal/' + decimal + '/' + precision,
            dataType: 'json',
            type: 'GET',
        });
    }

    getNationalities() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/nationality',
            dataType: 'json',
            type: 'GET',
        });
    }

    getRtpList() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/casino/gamesRtp',
            dataType: 'json',
            type: 'GET',
        });
    }

    getServerTime() {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/GetServerTime',
            dataType: 'json',
            type: 'GET',
        });
    }
}

export default new Util();