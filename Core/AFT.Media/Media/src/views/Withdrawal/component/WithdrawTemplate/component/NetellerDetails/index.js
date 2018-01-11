/**
 * Created by gian.jamisola on 6/1/2017.
 */

import React from 'react';

let NetellerDetails = (props) => {
    return (
        <div>
            <div className="form-group row">
                <div className="col-xs-4">
                    <label className="control-label">{`${props.method} Account:`}</label>
                </div>
                <div className="col-xs-8">
                    <span>{props.details.accountId}</span>
                </div>
            </div>
        </div>
    )
}

NetellerDetails.propTypes = {
    method: React.PropTypes.string,
    details: React.PropTypes.object
}

export default NetellerDetails;