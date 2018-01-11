/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import { root } from 'nls/common';

let localCommon = {
	tTransHistory: "Transaction History"
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;