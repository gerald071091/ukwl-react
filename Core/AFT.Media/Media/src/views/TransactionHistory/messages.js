/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import { root } from 'nls/messages';

let localMessages = {
	transHistoryMsg: "This section allows you to view the details of all transactions made in your account depending on the time period specified."
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;