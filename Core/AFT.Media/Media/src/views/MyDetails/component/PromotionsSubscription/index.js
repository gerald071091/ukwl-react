/**
 * Created by gian.jamisola on 6/8/2017.
 */

import React from 'react';
import format from 'string-format';

import iCommon from '../../common';

import { BtnRed } from 'comp/Button';
import Input from 'comp/Input';

class PromotionsSubscription extends React.Component {
    static propTypes = {
        cbPromoSubscription: React.PropTypes.bool,
        checkPromotionSubscription: React.PropTypes.func,
        submitPromoSubscription: React.PropTypes.func
    }

    constructor(props){
        super(props);
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.cbPromoSubscription !== this.props.cbPromoSubscription) {
            document.getElementById('cb-promosubscription').checked = nextProps.cbPromoSubscription;
        }
    }

    render() {
        return(
            <div>
                <div>
                    <Input id="cb-promosubscription"
                           type="checkbox"
                           onChange={this.props.checkPromotionSubscription}
                           defaultChecked={this.props.cbPromoSubscription}>
                        <span>&nbsp;{format(iCommon('cbPromoSubDescription'), window.siteName)}</span>
                    </Input>
                </div>
                <BtnRed className="col-xs-2 pull-left"
                        text={iCommon('cSave')}
                        onClick={this.props.submitPromoSubscription} />
            </div>
        )
    }
}

export default PromotionsSubscription;