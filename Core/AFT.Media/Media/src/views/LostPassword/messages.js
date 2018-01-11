/**
 * Created by gian.jamisola on 5/5/2017.
 */

let root = {
	success: "New password has been sent.",
	secureQuestionRequired: "Security question is required.",
	secureAnswerRequired: "Security answer is required.",
	forceResetCookie: "forceResetPassword",
	forceResetTitle: "We Have Upgraded BetVision To Serve You Better!",
	forceResetMessage: "<p>Welcome to the new and improved 12Bet. Our new website is bigger and better featuring more Sports betting markets including an improved Live In-Play product. We also offer our players a large number of Casino games and all the latest Slots.</p><p>&nbsp;</p><p>For existing customers, your username and account information will remain unchanged. If you haven't received your temporary password please click the Forgot Password link at the top of this page and use Option 3.</p>",

	pLoginName: "Please enter your login name",
	pEmail: "Please enter your email"

}


let getValue = (code) => root[code];

export default getValue;