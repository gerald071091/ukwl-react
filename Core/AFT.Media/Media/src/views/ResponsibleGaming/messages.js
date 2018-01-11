/**
 * Created by gian.jamisola on 5/5/2017.
 */

import {root} from 'nls/messages.js';

let localMessages = {
    selfExcludeOrTimeOutRequired: "Self-Exclude or Time-Out should be checked.",
    selfExcludeConfirm: "Are you sure you want to {0}?",
    selfExcluded: "Your account has been successfully excluded, you will be logged out.",

    realityCheckConfirm: "Are you sure you want to update your Reality Check time interval to {0}?",
    realityCheckZero: "Are you sure you don't want to set a Reality Check?",
    realityCheckSuccess: "Reality Check successfully updated.",
    realityCheckRemoved: "Reality Check successfully removed.",
    realityCheckStillLoading: "Reality Check is still loading, please wait.",

    dpLimitIncorrectAmt: "Incorrect format of deposit limit."
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;