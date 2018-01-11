/**
 * Created by isabella.inosantos on 6/7/2017.
 */

import { root } from 'nls/messages';

let localMessages = {
	gameHistoryMsg: "This section provides all the details of your gaming history such as your total wins/losses, as well as the total bets you have placed under your account across the different products except Sportsbook and Poker."
};

let combined = Object.assign({}, root, localMessages);

let getValue = (code) => combined[code];

export default getValue;