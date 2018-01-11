/**
 * Created by gian.jamisola on 6/1/2017.
 */

import React from 'react';

import Input from 'comp/Input';
import Select from 'comp/Select';

import styles from '../../../../withdrawal.scss';

class WorldpayDetails extends React.Component {
    static propTypes = {
        method: React.PropTypes.string,
        details: React.PropTypes.object,
        getCardDetails: React.PropTypes.func
    }

    state = {
        expMM: '',
        expYY: '',
        cvv: '',
        encryptedCardNumber: ''
    }

    componentDidMount(){
        (() => {
            let cardsAvailable = this.props.details,
                selectedCard = '';
            for(let x in cardsAvailable) {
                if(cardsAvailable[x].selected) {
                    selectedCard = cardsAvailable[x];
                    this.setState({encryptedCardNumber: selectedCard});
                }
            }

            document.getElementById("sb-cardnumber").selectedIndex = 0;
        })();
    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="col-xs-4">
                        <label className="control-label">Card Number:</label>
                    </div>
                    <div className="col-xs-8">
                        <Select id="sb-cardnumber"
                                options={this.props.details.cards}
                                className={styles.wpSelectWidth}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xs-4">
                        <label className="control-label"> Expiry Date:</label>
                    </div>
                    <div className={`col-xs-2 ${styles.wpWidthAuto}`}>
                        <Input name="expdateMM"
                               type="text"
                               className={`form-control ${styles.wpInputWidth}`}
                               placeholder="MM"
                               maxLength={2}
                               size={3}
                               onBlur={this.props.getCardDetails}/>
                    </div>
                    <div className={`pull-left ${styles.expDateSeparator}`}>/</div>
                    <div className={`col-xs-2 ${styles.wpWidthAuto}`}>
                        <Input name="expdateYY"
                               type="text"
                               className={`form-control ${styles.wpInputWidth}`}
                               placeholder="YY"
                               maxLength={2}
                               size={3}
                               onBlur={this.props.getCardDetails}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-xs-4">
                        <label className="control-label">Security code / CVV2:</label>
                    </div>
                    <div className="col-xs-3">
                        <Input name="cvv"
                               type="text"
                               className={`form-control ${styles.wpInputWidth}`}
                               maxLength={3}
                               size={4}
                               onBlur={this.props.getCardDetails}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default WorldpayDetails;