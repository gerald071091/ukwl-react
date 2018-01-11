/**
 * Created by gian.jamisola on 6/6/2017.
 */

import {root} from 'nls/messages.js';

let localMessages = {
    passwordLengthError: "Password length should be from 6 to 20 characters.",
    passwordsDoNotMatch: "Passwords do not match.",
    passwordsEqualOldPassword: "New password cannot be same with old password!",
    passwordUpdated: "Change password success.",
    passwordChangedSuccessfully: "Password is changed successfully."
}

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;