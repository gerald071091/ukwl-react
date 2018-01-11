/**
 * Created by isabella.inosantos on 6/8/2017.
 */

let products = [
		{ id: 111, ep: "multislot", text: "Multislot" },
		{ id: 18, ep: "microgaming", text: "Quickfire" },
		{ id: 112, ep: "sbtech", text: "Sportsbook" }
	],

	transactionLimits = [
		{ value: 10 },
		{ value: 50 },
		{ value: 100 }
	],

	headerTitles = ["Game", "Game ID", "Date", "Total Bets", "Bet Amount", "Win/Loss"];

export default { products, transactionLimits, headerTitles };