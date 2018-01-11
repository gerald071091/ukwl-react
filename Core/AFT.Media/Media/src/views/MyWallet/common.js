/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import { root } from 'nls/common.js';

let localCommon = {
	mainWallet: "Main Wallet",
	availBalance: "Available Balance",
	hBalance: "Your balances:"
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;