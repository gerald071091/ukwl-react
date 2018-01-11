/**
 * Created by gian.jamisola on 5/31/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "Withdrawal",
    fcDetails: "DETAILS",
    fcWDMethod: "YOUR WITHDRAWAL METHOD",
    mainWallet: "Main Wallet",
    wdAmount: "Withdrawal Amount",
    balanceWD: "Balance Available for Withdrawal",
    paymentInfo: "{0} INFORMATION",
    description: `<p>Withdrawals can only be made using the original deposit method. In case of a Bank deposit, the method of withdrawal will be agreed between the player and the ${window.siteName} Support Team.</p>
            <p>Please refer to our <a href="/help/depositandwithdrawal" target="_blank"> Withdrawal Policy</a> for more information.</p>
            <p>Notice: On your first withdrawal, you will be required to submit documents as stated on our Withdrawal Policy. After submitting a withdrawal request, you will be given a week (7 days) to accomplish our request. Otherwise, your withdrawal request shall be rejected. Once rejected, your funds will be returned to the main wallet.</p>`,
    wpDebitCard: "Debit Card",
    wpCreditCard: "Credit Card",
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;