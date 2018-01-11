/**
 * Created by gian.jamisola on 5/5/2017.
 */

let root = {
	//Buttons
	bDemo: "Demo",
	bJoinNow: "Join Now",
	bLogin: "Login",
	bPlayNow: "Play Now",
	cWelcome: "Welcome",

	cPleaseWait: "Please wait...",
	cError: "Error",
	cNotice: "Notice",
	cSuccess: "Success",
	cConfirmed: "Confirmed",
	cConfirm: "Confirm",
	cLoading: "loading...",
	cLoadingGames: "Loading games...",
	cNoResult: "No Results Found",
	cNoRecord: "No Records",
	cEmpty: "Empty",
	cMessage: "Message",
	cOk: "OK",
	cAccept: "Accept",
	cCancel: "Cancel",
	cLater: "Later",
	cThankYou: "Thank You",
	cSubmit: "Submit",
	cDeposit: "Deposit",
  	cWithdraw: "Withdraw",
  	cBack: "Back",
	cNext: "Next",
	cSave: "Save",

	//PaymentProviders
	payWorldpay: "Worldpay",
	paySkrill: "Skrill",
	payNeteller: "Neteller",

	//Header Nav
	hPromotions: "Promotions",
	hHelp: "Help",
	hAffiliates: "Affiliates",
	hForgotPW: "Forgot Password",
	hHello: "Hello",
	hMainWallet: "Main Wallet",
	hAvailBalance: "Available Balance",
	hDeposit: 'Deposit',
	hMyAccount: 'My Account',
	hLogOut: 'Log Out',

	//Header Tabs
	hSports: "Sports",
	hCasino: "Casino",

	//Footer Nav - Site Information
	fOpenAccount: "Open Account",
	fAboutUs: "About Us",
	fContactUs: "Contact Us",
	fPromotions: "Promotions",
	fTerms: "Terms and Conditions",
	fRules: "Rules",
	fPrivacyPolicy: "Privacy Policy",
	fCashout: "Cash Out",
	//Footer Nav - Help
	fLostPassword: "Lost Password",
	fTechnicalSupport: "Technical Support",
	fDepositAndWithdrawals: "Deposits & Withdrawals",
	fResponsibleGambling: "Responsible Gambling",
	fRtp: "RTPs",
	fFaq: "FAQs",

	//ACCOUNT SIDEBAR

	fMyWallet: "My Wallet",
	fMyBonuses: "My Bonuses",
	fGameHistory: "Game History",
	fBonusHistory: "Bonus History",
	fTransHistory: "Transaction History",

	regComplete: "Registration Complete",

	//Casino
	//*CATEGORIES
	csnAG: "All Games",
	csnTopG: "Top Games",
	csnRS: "Real Sports",
	csnFS: "5050 Sports",
	csnScratch: "Scratch",
	csnBK: "Bingo / Keno",
	csnBJ: "Blackjack",
	csnCG: "Card Games",
	csnFeatured: "Featured",
	csnIG: "Instant Games",
	csnMG: "Mini Games",
	csnRoulette: "Roulette",
	csnSlots: "Slots",
	csnSG: "Soft Games",
	csnTblG: "Table Games",
	csnVP: "Video Poker",
	//*NAMES
	csnMain: "Main",
	csnSportsbook: "Sportsbook",
	csnFBetting: "Financial Betting",
	csnMultislots: "Multislots",
	csnCasino: "Casino",
	csnPoker: "Poker",
	csn5050: "5050",
	//*PROVIDERS
	csnAmaya: "",
	csnQF: "Quickfire",
	csnRSG: "RSG",
	cJackpot: 'Jackpot',

	//password stength
	psVeryWeak: 'Very Weak',
	psWeak: 'Weak',
	psStrong: 'Strong',
	psVeryStrong: 'Very Strong',

	//UNGROUPED (ETC)
	newsCanNotBeFound: "News can't be found",
	tncOkInstruction: "PLEASE NOTE THAT OUR TERMS & CONDITIONS HAVE CHANGED SINCE YOUR LAST LOGIN, PLEASE CLICK BELOW TO ACCEPT THE RECENT CHANGES.",
	importantMessage: "",
	eighteenPlus: '18+',
};

let getValue = (code) => root[code];

export default getValue;
export { root };
