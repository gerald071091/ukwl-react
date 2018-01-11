/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import { root } from 'nls/common';

let localCommon = {
	tBonusBalances: "Your Bonus Balances",
	tBettingBalance: "Betting Balance Summary",

	main: "Main",
	sbtech: "Sportsbook",
	spotoption: "Financial Betting",
	multislot: "Multislots",
	amaya: "Casino",
	microgaming: "Poker",
	realsports: "5050"
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;