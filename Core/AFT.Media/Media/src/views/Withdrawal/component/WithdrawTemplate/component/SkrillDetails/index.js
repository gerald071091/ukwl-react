/**
 * Created by gian.jamisola on 6/1/2017.
 */

import React from 'react';

let SkrillDetails = (props) => {
    return (
        <div>
            <div className="form-group row">
                <div className="col-xs-4">
                    <label className="control-label">{`${props.method} Email:`}</label>
                </div>
                <div className="col-xs-8">
                    <span>{props.details.email}</span>
                </div>
            </div>
        </div>
    )
}

SkrillDetails.propTypes = {
    method: React.PropTypes.string,
    details: React.PropTypes.object
}

export default SkrillDetails;