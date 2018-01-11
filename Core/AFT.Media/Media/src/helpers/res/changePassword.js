/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class ChangePassword {
    changePassword (oldPassword, newPassword) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/change-password',
            dataType: 'json',
            type: 'POST',
            data: {
                Current: oldPassword,
                New: newPassword,
            }
        });
    }
}

export default new ChangePassword();
