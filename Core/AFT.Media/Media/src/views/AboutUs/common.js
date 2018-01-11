/**
 * Created by gian.jamisola on 6/9/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "About Us"
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;