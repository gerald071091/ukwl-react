/**
 * Created by gian.jamisola on 5/4/2017.
 */

import rego from '../rego';

class ForgotPassword {

    sendEmail (username, email) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/reset-password',
            dataType: 'json',
            type: 'POST',
            data: {
                ResetType: 1,
                UserName: username,
                Email: email,
            }
         });
    }

    sendEmailWithSecurityQuestion (data) {
        return rego.ajax({
            url: '/' + window.apiMethod + '/' + window.cultureCode + '/reset-password',
            dataType: 'json',
            type: 'POST',
            data: data
            // data: {
            //     ResetType: 2,
            //     UserName: username,
            //     Email: email,
            //     SecurityQuestion: question,
            //     SecurityAnswer: answer
            // }
        });
    }

}

export default new ForgotPassword();