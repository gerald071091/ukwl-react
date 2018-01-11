/**
 * Created by isabella.inosantos on 6/8/2017.
 */

let transactionTypes = [
		{ id: 0, text: "Deposit and Withdrawal" },
		{ id: 1, text: "Deposit" },
		{ id: 2, text: "Withdrawal" }
	],

	transactionLimits = [
		{ value: 10 },
		{ value: 50 },
		{ value: 100 }
	],

	headerTitles = ["Transaction ID", "Transaction Type", "Date", "Status", "Amount"];

export default { transactionTypes, transactionLimits, headerTitles };