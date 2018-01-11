/**
 * Created by bernard.molina on 6/20/2017.
 */
import {root} from 'nls/common.js';

let localCommon = {
	netellerDetails: 'Neteller Details:',

	netellerText: `Neteller is an e-wallet that offers fast, simple and secure online payments. 
	Transfer funds from your bank account or use a credit or debit card to pay into your e-wallet 
	which can be used to pay for products and services online. You can also use your e-wallet 
	to accept payments.`,

	accntId: 'Account ID:',
	secureIdtext: 'Secure ID or Authentication Code',
	netelerSecureId: `Deposits into your BetVision account can be made instantly from an existing
	 Neteller account or you can set one up by <a href="https://www.neteller.com/" target="_blank">clicking here.</a>`,

	haveReadTerms: `I have read and understand within the <a href="en-gb/terms" target="_blank">Terms & Conditions</a> 
	how my player funds are held and protected.`,

	cAccordance: `<p>In accordance with player protection requirements governed under the terms of our Isle of 
	Man licence, player funds (including deposits, winnings and applicable bonuses) are held with a bank that has 
	been approved and which is given special powers by Isle of Man law. Under the law, any money that is held in 
	this Client Account is considered to belong to players. This means that in the event of insolvency, funds 
	will be repaid to players first, under instruction by the Isle of Man Gambling Supervision Commission. 
	This protection is afforded to all of our customers.</p>

	<p>In accordance with the terms of our UK licence, we are required to inform customers that this means that
	 steps have been taken to protect customer funds but that there is no absolute guarantee that all funds 
	 will be repaid. The mechanism described meets the UK Gambling Commission’s requirements for the segregation
	 of customer funds at the level: medium protection. Further information can be found
	  <a href="http://www.gamblingcommission.gov.uk/Consumers/Protection-of-customer-funds.aspx" target="_blank">here</a>. 
	  </p>`,
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;