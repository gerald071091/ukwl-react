/**
 * Created by gian.jamisola on 5/5/2017.
 */

import {root} from 'nls/messages.js';

let localMessages = {
    generalQuestion: "General Question",
    technical: "Technical",
    payment: "Deposit and Withdrawal",
    account: "Account Related Concerns",
    feedback: "Feedback",
    affiliate: "Affiliate Enquiry",
    subjectRequired: "Subject is required.",
    contentRequired: "Message is required.",
    querySent: "Your query has been sent to our customer service.",

    //Form Validation Messages
    fvContent: "Message is required.",
    fvSubject: "Subject is required."
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;