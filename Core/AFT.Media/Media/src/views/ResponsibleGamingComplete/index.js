/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';
import moment from 'moment';
import format from 'string-format';

import iCommon from 'nls/common';

import rUtils from 'res/util';

class RGComplete extends React.Component {
    static propTypes = {
        getText: React.PropTypes.func,
        params: React.PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    state = {
        selfExcludeTo: {},
        selfExcludeFrom: {}
    };

    componentDidMount() {
        this.props.getText('sidebarInfo');

        rUtils.getServerTime()
            .done((result) => {
                const fromDate = moment(result.now, 'DD/MM/YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm');
                const toDate = moment(fromDate).add(this.props.params.days, 'days').format('MM/DD/YYYY HH:mm');
                this.setState({selfExcludeFrom: fromDate, selfExcludeTo: toDate});
            })
    }

    render() {
        const MARKUP = this.props.params.type === 'timeout'
            ? format(iCommon('rgTOCompleteMsg'), iCommon('rgTimeOut'), this.state.selfExcludeFrom, this.state.selfExcludeTo)
            : format(iCommon('rgSECompleteMsg'), iCommon('rgSelfExclude'), this.state.selfExcludeTo);
        return(
            <div>
                <h2>{format(iCommon('rgHeaderTitle'), 'Complete')}</h2>
                <br/>
                <div dangerouslySetInnerHTML={{__html: MARKUP}}></div>
            </div>
        );
    }
}

export default RGComplete;