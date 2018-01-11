/**
 * Created by gian.jamisola on 6/1/2017.
 */

import React from 'react';
import format from 'string-format';

import iCommon from '../../common';

import { BtnRed, BtnWhite } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import NetellerDetails from './component/NetellerDetails';
import SkrillDetails from './component/SkrillDetails';
import WorldpayDetails from './component/WorldpayDetails';

import styles from '../../withdrawal.scss';

let WithdrawTemplate = (props) => {
    const METHOD = props.method;
    let DETAILSMARKUP = '';

    switch(METHOD) {
        case iCommon('payNeteller'):
            DETAILSMARKUP = <NetellerDetails method={METHOD} details={props.details}/>
            break;

        case iCommon('paySkrill'):
            DETAILSMARKUP = <SkrillDetails method={METHOD} details={props.details}/>
            break;

        case iCommon('payWorldpay'):
            DETAILSMARKUP = <WorldpayDetails method={METHOD} details={props.details} getCardDetails={props.updateWorldpayCardDetails}/>
            break;
    }

    return (
        <div>
            <FormContainer title={iCommon('fcDetails')}>
                <div className="form-group row">
                    <p className="col-xs-4">
                        <label>{`${iCommon('wdAmount')}:`}</label>
                    </p>
                    <div className="col-xs-4">
                        {`${window.currencySymbol}${props.wdAmount}`}
                    </div>
                </div>
                <div className="form-group row">
                    <p className="col-xs-4">
                        <label>Withdraw From:</label>
                    </p>
                    <div className="col-xs-4">
                        {iCommon('mainWallet')}
                    </div>
                </div>
            </FormContainer>

            <FormContainer title={iCommon('balanceWD')}>
                <div className="form-group row">
                    <p className="col-xs-4">
                        <label> {`${iCommon('mainWallet')}:`}</label>
                    </p>
                    <div className="col-xs-4">
                        {props.balance}
                    </div>
                </div>
            </FormContainer>

            <FormContainer title={format(iCommon('paymentInfo'), METHOD)}>
                {DETAILSMARKUP}
            </FormContainer>

            <img src={window.cmsMedia("Content/images/footer/secure.png")} />
            <div className={`form-group ${styles.btnContainer}`}>
                <BtnRed className="col-xs-2 pull-right"
                        text={iCommon('cWithdraw')}
                        onClick={props.withdraw} />
                <BtnWhite className="col-xs-2 pull-right"
                        text={iCommon('cBack')}
                        onClick={props.goBack}/>
            </div>
        </div>
    )
}

WithdrawTemplate.propTypes = {
    method: React.PropTypes.string,
    wdAmount: React.PropTypes.number,
    balance: React.PropTypes.string,
    details: React.PropTypes.object,
    goBack: React.PropTypes.func,
    withdraw: React.PropTypes.func,
    updateWorldpayCardDetails: React.PropTypes.func
}

export default WithdrawTemplate;