/**
 * Created by bernard.molina on 6/1/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
	netellerDescription: "An e-wallet that gives you instant access to your cash to make fast, simple and " +
	"secure online payments. Neteller offers instant deposits, withdrawals and payouts.",
	visaDescription: "The fastest and most common payment solution to deposit fund and do payments securely online. " +
	"We operate the 3DSecure scheme so you may be asked for a password to complete your payment. If you have " +
	"difficulty remembering your 3DS password we recommend using the Personal Message or " +
	"Greeting field to give yourself a prompt.",
	skrillDescription: "An e-wallet that provides universal payment solutions that is simple, convenient and secure." +
	" Skrill is available anywhere, anytime, for anyone and on any device."

};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;