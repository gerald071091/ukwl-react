/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class ResponsibleGaming {

    selfExclude (data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/self-exclude',
            dataType: 'json',
            type: 'POST',
            data: data
        });
    }

}

export default new ResponsibleGaming();