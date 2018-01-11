/**
 * Created by gian.jamisola on 5/16/2017.
 */

import React from 'react';
import iCommon from 'nls/common';
import PaymentBase from 'res/payments';

import styles from './depositlimit.scss';

const RPAYMENT = new PaymentBase();

class DepositLimit extends React.Component {
    static propTypes = {
        transactionMethod: React.PropTypes.string
    };

    static defaultProps = {
        transactionMethod: ''
    };

    constructor(props) {
        super(props);

        this._getTransactionLimits = this._getTransactionLimits.bind(this);
        this._mountMarkup = this._mountMarkup.bind(this);
    }

    state = {
        minValue: [],
        maxValue: [],
        tlimitsList: []
    };

    componentDidMount() {
        this._getTransactionLimits();
    }

    _getTransactionLimits(){
        let tmp = [false, false, false],
            transactionMethod = this.props.transactionMethod;

        let populateData = (data, response) => {
            let limitsList = this.state.tlimitsList;

            if (typeof (response.paymentPublicTransactionLimit) !== 'undefined') {
                response.paymentPublicTransactionLimit.map((val) => {
                    return (
                        this.setState({minValue: val.min,
                                       maxValue: val.max})
                    );
                });
            } else {
                this.setState({minValue: response.min,
                               maxValue: response.max})
            }

            data.isNeteller && limitsList.push({
                Neteller: {
                    min: this.state.minValue,
                    max: this.state.maxValue
                }
            });

            data.isSkrill && limitsList.push({
                Skrill: {
                    min: this.state.minValue,
                    max: this.state.maxValue
                }
            });

            data.isWorldPay && limitsList.push({
                Worldpay: {
                    min: this.state.minValue,
                    max: this.state.maxValue
                }
            });

            this.setState({tlimitsList: limitsList});
        };

        for (let x = 0; x < 3; x++) {
            if (x > 0) {
                tmp[x - 1] = false;
            }

            tmp[x] = true;

            let data = {
                isNeteller: tmp[0],
                isSkrill: tmp[1],
                isWorldPay: tmp[2]
            };

            if (!window.authed) {
                RPAYMENT.getPublicDepositLimits(data)
                    .done((response) => {
                        populateData(data, response);
                    });
            } else {
                if (transactionMethod !== '') {
                    if (transactionMethod === `${iCommon('cDeposit')}`) {
                        RPAYMENT.getPerTransactionDepositLimits(data)
                            .done((response) => {
                                populateData(data, response);
                            });
                    } else {
                        RPAYMENT.getPerTransactionWithdrawalLimits(data)
                            .done((response) => {
                                populateData(data, response);
                            });
                    }
                }
            }


        }
    }

    _mountMarkup() {
        const TRANSACTIONMETHOD = this.props.transactionMethod;
        let dpList = this.state.tlimitsList;

        let markup = (val, key) => {
            return (
                <div key={key} className={`${styles.clearfix} col-xs-3`}>
                    <div className="col-xs-6" >
                        <span>{val.min}</span><br />
                    </div>
                    <div className="col-xs-6" >
                        <span>{val.max}</span><br />
                    </div>
                </div>
            )
        };

        return (
            <div className={styles.clearfixDPLimit}>
                {TRANSACTIONMETHOD.toUpperCase() === `${iCommon('payNeteller').toUpperCase()}` ?
                    dpList.map((method, key) => {
                        for (let i in method) {
                            if (i === iCommon('payNeteller')) {
                                return (
                                    markup(method[i], key)
                                );
                            }
                        }

                        return '';
                    })
                    : TRANSACTIONMETHOD.toUpperCase() === `${iCommon('paySkrill').toUpperCase()}` ?
                    dpList.map((method, key) => {
                        for (let i in method) {
                            if (i === iCommon('paySkrill')) {
                                return (
                                    markup(method[i], key)
                                );
                            }
                        }

                        return '';
                    })
                    : TRANSACTIONMETHOD.toUpperCase() === `${iCommon('payWorldpay').toUpperCase()}` ?
                    dpList.map((method, key) => {
                        for (let i in method) {
                            if (i === iCommon('payWorldpay')) {
                                return (
                                    markup(method[i], key)
                                );
                            }
                        }

                        return '';
                    })
                    : ''
                }
            </div>
        )
    }

    render() {
        let dpList = this.state.tlimitsList;

        return(
            <div id={styles.dpLimitContainer} className="dplimit-container">
                <div className={styles.clearfix}>
                    <div className="col-xs-3">
                        <strong className="col-xs-6">MIN</strong>
                        <strong className="col-xs-6">MAX</strong>
                    </div>
                    {dpList.length > 0 && this._mountMarkup()}
                </div>
            </div>
        );
    }

}

export default DepositLimit;