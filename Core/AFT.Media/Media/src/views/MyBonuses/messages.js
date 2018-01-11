/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import {root} from 'nls/messages';

let localMessages = {
	bonusBalanceMsg: "This area provides you the details of the balances for your Main Wallet.",
	bettingBonusMsg: "This section displays your betting balance which is all the winnings you had from the bonuses claimed products.",
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;