/**
 * Created by isabella.inosantos on 6/9/2017.
 */

import { root } from 'nls/messages';

let localMessages = {
	bonusHistoryMsg: "This section allows you to view the summary of all the bonuses received and claimed from the different products. It also provides specific details such as amount, status and its expiry date."
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;