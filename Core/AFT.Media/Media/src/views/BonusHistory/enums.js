/**
 * Created by isabella.inosantos on 6/8/2017.
 */

let products = [
		{ id: 0, ep: "amaya", text: "Casino" },
		{ id: 112, ep: "sbtech", text: "Sportsbook" }
	],

	status = [
		{ value: 99, text: "All" },
		{ value: 0, text: "Active" },
		{ value: 2, text: "Void" },
		{ value: 1, text: "Wagered" }
	],

	transactionLimits = [
		{ value: 10 },
		{ value: 50 },
		{ value: 100 }
	],

	headerTitles = ["Bonus Code", "Description", "Bonus", "Amount", "Expiry Date", "Status"];

export default { products, status, transactionLimits, headerTitles };