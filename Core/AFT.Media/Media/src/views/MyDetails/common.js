/**
 * Created by gian.jamisola on 6/6/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: 'My Details',
    welcomeMsg: 'Welcome {0}!',
    description: `<p>This section allows you to view the account details you have submitted in {0}. Please make sure that the infomation registered here matches your documents’ specifics.</p>
                <p>If you wish to change your password, kindly input your new password and click update. Please take note of this as you will be using it to login to your account.</p>`,
    namepwFormTitle: 'NAME & PASSWORD:',
    addressFormTitle: 'ADDRESS:',
    contactFormTitle: 'CONTACT DETAILS:',
    subscriptionsFormTitle: 'PROMOTIONS SUBSCRIPTION:',
    cbPromoSubDescription: 'I would like to receive information about offers and promotions for {0}.',
    changePWBtn: 'Change Password',
    updateBtn: 'Update'
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;