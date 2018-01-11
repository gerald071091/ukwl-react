/**
 * Created by gian.jamisola on 6/8/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "TECHNICAL SUPPORT"
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;