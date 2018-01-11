/**
 * Created by gian.jamisola on 5/31/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "CASINO PAYOUT: RTPS",
    thGameName: "GAME NAME",
    thReturnRatio: "RETURN RATIO",
    thProvider: "PROVIDER",
    pMicrogaming: "MicroGaming Poker",
    pMultislot: "Multislot",
    pVegas: "Vegas",
    pRSG: "Realsports",
    pRedTiger: "RTE",
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;