/**
 * Created by bernard.molina on 6/5/2017.
 */
import {root} from 'nls/common.js';

let localCommon = {
	//Deposit Page
	dWelcome: 'Welcome',
	dWelcomeDescription: `<p>We offer multiple options for deposits & withdrawals which are shown below, each
        section gives some background on each payment method. Before depositing, we recommend 
        that our Terms & Conditions are read in full to ensure that you understand your 
        obligations before playing on our site.</p>

		<p>BetVision is committed to responsible gambling and recommends that players 
		deposit responsibly and within their means. There are daily thresholds in place 
		which are determined by our Security Team who perform checks on all payments, please 
		contact our Customer Support Team for further information relating to this if required.</p>
		
		<p>We allow multiple Payment Methods for deposits on your account as long as the name 
		and billing address matches that of your Debit and Credit card statement. For your 
		security, we may also conduct additional checks before we allow this option to be 
		activated so please be ready with your documents such as your bank statement.</p>
		
		<p>Withdrawals can only be made using the original deposit method. If you decide 
		to change the method of withdrawal, please contact our Customer Support Team.</p>
		
		<p>Identification may be required before a withdrawal can be made from your account.</p>`,

	dInAccordanceText: 'In accordance with our responsible gambling policy, ' +
	'you may set a deposit limit here at any time.',

	skTitle: 'Skrill 1-Tap',
	skDescription: 'An e-wallet that provides universal payment solutions that is simple convenient and secure. ' +
	'Skrill is available anywhere, anytime, for anyone and on any device.',

	acctLogin: 'Account Login',
	acctName: 'Account Name',
	enterAmt: `Enter Amount (${window.currencySymbol})`,
	orSelect: 'or select',

	skrillDetails: 'Skrill Details:',
	skrillOnetapDetails: 'SKRILL 1-TAP DETAILS:',

	skrillText: `<p>Skrill is an E-Wallet that offers fast, simple and secure online payments. Transfer funds from your 
	bank account or use a credit or debit card to pay into your e-wallet which can then be used to pay for products 
	and services online. You can also use your e-wallet to accept payments.</p>

	<p>Skrill account holders are identified by email address and not by name. We will only accept your deposit if 
	your email address registered with Skrill matches exactly your email
 	address registered to your BetVision account.</p>
	
	<p>Deposits into your BetVision account can be made instantly from an existing Skrill account or you 
	can set one up by <a href="http://www.skrill.com" target="_blank">clicking here</a>.</p>`,

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

	depSuccess: 'Deposit Success',
	depSuccessMsg: 'You have successfully deposited. The following is the transaction detail for your reference.',
	depRefNumber: 'Reference Number:',
	depAmount: 'Deposit Amount:',
	depCurrBalance: 'Current Balance:',
	depPendingStatus: 'Your deposit is currently on pending status. ',
	depContactSupport: 'Please contact our support regarding to the deposit issue.'



};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;