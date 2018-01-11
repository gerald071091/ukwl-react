/**
 * Created by isabella.inosantos on 6/9/2017.
 */

import { root } from 'nls/common';

let localCommon = {
	tBonusHistory: "Bonus History"
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;