/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class Banners {
    getBanners(tag) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/banners/' + tag,
            type: 'get',
            cache: true
        });
    }

    getOureaBanners(type) {
        return rego.ajax({
            url: '/api/' + window.cultureCode + '/getbanners',
            type: 'get',
            cache: true,
            data: {
                bannerType: type,
                isLoggedIn: window.authed ? 'y' : 'n',
                platform: window.isMobile ? 'mobile' : 'desktop'
            }
        })
    }
}

export default new Banners();