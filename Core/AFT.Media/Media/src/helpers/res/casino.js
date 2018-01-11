/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Casino {
    checkAvailable (product) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/available',
            type: 'get',
            dataType: 'json'
        });
    }

    games () {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/casino/games',
            type: 'get',
            dataType: 'json'
        });
    }

    amayaUrl (id, gameId, cat, type) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/casino/new/amaya/games/url?id=' + id + '&gameId=' + gameId + '&category=' + cat + '&vendorGameType=' + type,
            dataType: 'json',
            type: 'GET'
        });
    }

    multislotUrl (gameId, type) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/casino/multislot/' + gameId + '/' + type,
            dataType: 'json',
            type: 'GET'
        });
    }

    microgamingUrl (gameId, lobbyUrl, type) {
        return rego.ajax({
            url: '/' + window.casinoApiMethod + '/' + window.cultureCode + '/casino/microgaming/quickfire/' + gameId + '/' + type + '-url',
            dataType: 'json',
            type: 'GET',
            data: {
                lobbyUrl: lobbyUrl
            }
        });
    }

    realsports5050Url (type, gameId) {
        return rego.ajax({
            url: '/' + window.casinoApiMethod + '/' + window.cultureCode + '/casino/realsports/5050-' + type + '/' + gameId + '/url',
            dataType: 'json',
            type: 'GET'
        });
    }

    realsportsMiniGame () {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/casino/realsports/5050-sports-mini/url',
            type: 'get',
            dataType: 'json'
        });
    }

    histories (product, from, to, page, pageSize) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/products/' + product + '/game-histories',
            data: {
                from: from,
                to: to,
                page: page,
                pageSize: pageSize
            },
            type: 'get',
            dataType: 'json'
        });
    }

    getProgressiveTicker(jackpotID) {
        return rego.ajax({
            url: '/api/en-gb/ProgressiveTickers/' + jackpotID,
            dataType: 'json',
            type: 'GET',
        });
    }

}

export default new Casino();