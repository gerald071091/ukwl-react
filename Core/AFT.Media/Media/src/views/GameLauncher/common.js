/**
 * Created by Marnie.Palapar on 6/8/2017.
 */
import {root} from 'nls/common.js';

let localCommon = {
    realityCheck: 'Reality Check',
    sessionTime: 'Session Time',
    currentTime: 'Current Time',
    bEndSession: `End Session` ,
    bContinue: `Continue`,
    realityCheckBody:
        `<p>You have been playing for {0}.</p>
        <p>You will be given another Reality Check in {1} minute/s.</p>
        <p>If you End Session now, any un-bet stakes will be returned to your balance.</p>
        <p>Click <a href='/${window.cultureCode}/{2}'>here</a> to view your Account History.</p>
        <p>Would you like to continue?</p>`
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;