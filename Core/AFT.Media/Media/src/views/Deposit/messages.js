/**
 * Created by bernard.molina on 6/16/2017.
 */

let root = {
	agreedTerms: `<p>You must agree to Bonus Terms & Conditions.</p> 
				<span>Please contact <a href="javascript:void(showLiveChat())" 
				style="color: red" onclick="$.fancybox.close();">Customer Service</a> for further assistance.</span>`,
	amountReq: `<p>Amount is required</p>
				<p>You must agree to Bonus Terms & Conditions.</p> 
				<span>Please contact <a href="javascript:void(showLiveChat())" 
				style="color: red" onclick="$.fancybox.close();">Customer Service</a> for further assistance.</span>`,

	amount: 'Amount is required',
	acctId: 'Account Id is required.',
	securId: 'Secure Id is required.',
	depButFollowErrBonusCode: `Your Deposit was done successfully, but following error occured on your bonus code <br />`


};

let getValue = (code) => root[code];

export default getValue;