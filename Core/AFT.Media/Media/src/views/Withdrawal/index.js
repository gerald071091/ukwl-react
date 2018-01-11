/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';

import iCommon from './common';
import iMessages from './messages';
import utils from 'helpers/utils';
import validation from './validation';

import BaseComponent from 'base-component';
import Input from 'comp/Input';
import { BtnRed } from 'comp/Button';
import FormContainer from 'comp/FormContainer';
import DepositLimit from 'comp/DepositLimit';
import WithdrawTemplate from './component/WithdrawTemplate';
import Loaders from 'comp/Loader';
import PaymentTemplate from 'comp/PaymentTemplate';

import rWithdrawal from 'res/withdrawal';
import rBalances from 'res/balances';

class Withdrawal extends React.Component {
    static propTypes = {
        getText: React.PropTypes.func,
        openModal: React.PropTypes.func,
        closeModal: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._init = this._init.bind(this);
        this._getPaymentMethodDetails = this._getPaymentMethodDetails.bind(this);
        this._goBack = this._goBack.bind(this);
        this._proceedPage = this._proceedPage.bind(this);
        this._setWithdrawAmount = this._setWithdrawAmount.bind(this);
        this._showLoader = this._showLoader.bind(this);
        this._submit = this._submit.bind(this);
        this._updateWorldpayCardDetails = this._updateWorldpayCardDetails.bind(this);
        this._validateFields = this._validateFields.bind(this);
    }

    state = {
        isNextProcess: false,
        withdrawAmount: 0,
        lastDepositMethod: '',
        currentBalance: 0,
        bonusStatusUponWithdrawalWarning: '',
        paymentMethodDetails: {},
        wpCardDetails: {},
        isLoaderActive: true
    }

    componentWillMount() {
          this._init();
    }

    componentDidMount() {
        this.props.getText('sidebarSettings', "Withdraw");
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.lastDepositMethod !== this.state.lastDepositMethod ||
            nextState.isNextProcess !== this.state.isNextProcess
        )
    }

    _init() {
        $.when(
            rWithdrawal.lastExecuted(),
            rBalances.availableBalances('main'),
            rWithdrawal.bonusStatusUponWithdrawal())
            .done((r1, r2, r3) => {
                if(r1[0].hasDeposited) {
                    this.setState({
                        lastDepositMethod: iCommon(`pay${r1[0].method}`),
                        currentBalance: utils.roundToDecimal(r2[0].balance),
                        bonusStatusUponWithdrawalWarning: r3[0].doNotifyWithPopup ? r3[0].message : ''
                    }, () => {
                        this._getPaymentMethodDetails(this.state.lastDepositMethod);
                        this.setState({isLoaderActive: false})
                    });
                } else {
                    this.props.openModal({msg: iMessages('errHasNotYetDeposited'),
                        title: iCommon('cNotice'),
                        okCallback: () => {
                            this.props.closeModal();
                            location.replace('/en-gb/deposit');
                        } })
                }

            })
            .fail((jqXHR, textStatus, errMsg) => {
                this.props.openModal({msg: errMsg,
                    title: iCommon('cError') })
            })
    }

    _getPaymentMethodDetails(paymentMethod){
        switch(paymentMethod) {
            case iCommon('payNeteller'):
                rWithdrawal.netellerDetails()
                    .done((result) => {
                        this.setState({paymentMethodDetails: result})
                    })
                break;

            case iCommon('paySkrill'):
                rWithdrawal.skrillDetails()
                    .done((result) => {
                        this.setState({paymentMethodDetails: result})
                    })
                break;

            case iCommon('payWorldpay'):
                rWithdrawal.worldPayDetails()
                    .done((result) => {
                        this.setState({paymentMethodDetails: result})
                    })
                break;
        }
    }

    _goBack() {
        this.setState({isNextProcess: false,
                        withdrawAmount: 0})
    }

    _proceedPage(e) {
        e.preventDefault();

        if(this.state.withdrawAmount === 0) {
            this._setWithdrawAmount();
            this.props.openModal({msg: iMessages('v_amount_required'),
                title: iCommon('cError') })
        } else {
            (this._validateFields() && this.setState({isNextProcess: true}))
        }
    }

    _setWithdrawAmount(e) {

        let elem = typeof e !== 'undefined' ? e.target : document.getElementById('withdrawAmount');
        const VALUE = parseFloat(elem.value);
        let res = validation.amount(VALUE, this.state.currentBalance);

        utils.addValidError(!res, elem, res);

        (this._validateFields() && this.setState({withdrawAmount: utils.roundToDecimal(VALUE)}))
    }

    _showLoader(trigger) {
        trigger ? this.props.openModal({showLoader: true}) : this.props.openModal({showLoader: false});
    }

    _submit(e) {
        e.preventDefault();

        if (!this._validateFields()) {
            this.props.openModal({msg: iMessages('fvCheckAllFieldsArePopulated'),
                title: iCommon('cError') })
        }
        else {
            const WITHDRAWALMETHOD = this.state.lastDepositMethod;
            let data = {};
            this._showLoader(true);
            (()=>{
                let paymentMethodDetails = this.state.paymentMethodDetails;
                const WPCARDDETAILS = this.state.wpCardDetails;
                switch(WITHDRAWALMETHOD) {
                    case iCommon('payNeteller'):
                        data.amount = this.state.withdrawAmount;
                        data.accountId = paymentMethodDetails.accountId;
                        break;

                    case iCommon('paySkrill'):
                        data.amount = this.state.withdrawAmount;
                        data.email = paymentMethodDetails.email;
                        break;

                    case iCommon('payWorldpay'):
                        data.amount = this.state.withdrawAmount;
                        data.cardHolderName = this.paymentMethodDetails.cardHolderName;
                        data.encryptedCardNumber = WPCARDDETAILS.email;
                        data.expiryMonth = WPCARDDETAILS.expMM;
                        data.expiryYear = WPCARDDETAILS.expYY;
                        data.cvv = WPCARDDETAILS.cvv;
                        break;
                }
            })();

            switch(WITHDRAWALMETHOD) {
                case iCommon('payNeteller'):
                    rWithdrawal.netellerWithdraw(data)
                        .done(() => {
                            this._showLoader(false);
                            this.props.openModal({msg: iMessages('successMessage'),
                                title: iCommon('cThankYou'),
                                okCallback: this._goBack})
                        })
                        .fail((jqXHR, textStatus, errMsg) => {
                            this._showLoader(false);
                            this.props.openModal({msg: errMsg,
                                title: iCommon('cError') })
                        })
                    break;

                case iCommon('paySkrill'):
                    rWithdrawal.skrillWithdraw(data)
                        .done(() => {
                            this._showLoader(false);
                            this.props.openModal({msg: iMessages('successMessage'),
                                title: iCommon('cThankYou'),
                                okCallback: this._goBack})
                        })
                        .fail((jqXHR, textStatus, errMsg) => {
                            this._showLoader(false);
                            this.props.openModal({msg: errMsg,
                                title: iCommon('cError') })
                        })
                    break;

                case iCommon('payWorldpay'):
                    rWithdrawal.worldPayWithdraw(data)
                        .done(() => {
                            this._showLoader(false);
                            this.props.openModal({msg: iMessages('successMessage'),
                                title: iCommon('cThankYou'),
                                okCallback: this._goBack})
                        })
                        .fail((jqXHR, textStatus, errMsg) => {
                            this._showLoader(false);
                            this.props.openModal({msg: errMsg,
                                title: iCommon('cError') })
                        })
                    break;
            }
        }

    }

    _updateWorldpayCardDetails(e){
        let data = {};
        let elem = e.target;

        ((elem.name === "expdateMM" || elem.name === "expdateMM") && validation.wpCardExpDate(elem));
        (elem.name === "cvv" && validation.wpCVV(elem));

        if ($('.input-msg-error').is(":hidden")) {
            switch(elem.name){
                case 'expdateMM':
                    data.expMM = elem.value;
                    break;
                case 'expdateYY':
                    data.expYY = elem.value;
                    break;
                case 'cvv':
                    data.cvv = elem.value;
                    break;
            }

            this.setState({wpCardDetails: data});
        }
    }

    _validateFields(){
        let tmpArr = document.querySelectorAll('#withdrawalContainer .input-msg-error'),
            isValidated = false;

        for(let x = 0; x < tmpArr.length; x++) {
            if(tmpArr[x].offsetParent !== null) {
                isValidated = false;
                break;
            } else {
                isValidated = true;
            }
        }

        return isValidated;
    }
    render() {
        const ISNEXTCLICKED = this.state.isNextProcess,
              MAINWALLET = `${window.currencySymbol} ${this.state.currentBalance}`,
              WDAMOUNT = this.state.withdrawAmount,
              PAYMENTMETHODDETAILS = this.state.paymentMethodDetails;
        let withdrawalMethod = this.state.lastDepositMethod,
            Loader = this.state.isLoaderActive ? <Loaders /> : '';

        return(
            <div id='withdrawalContainer'>
                <h2 className="mainTitle">{iCommon('headerTitle')}</h2>
                <p dangerouslySetInnerHTML={{__html: iCommon('description')}}></p>

                {!ISNEXTCLICKED
                    ?
                        <div>
                            {withdrawalMethod !== ''
                                ?
                                <div>
                                    <FormContainer title={iCommon('fcDetails')}>
                                    <div className="form-group row">
                                        <p className="col-xs-4">
                                            <label>{`${iCommon('wdAmount')}:`}</label>
                                        </p>
                                        <div className="col-xs-4">
                                            <Input type="text"
                                                   id="withdrawAmount"
                                                   name="withdrawAmount"
                                                   className="form-control"
                                                   placeholder="0"
                                                   onBlur={this._setWithdrawAmount}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <p className="col-xs-4">
                                            <label>{`${iCommon('balanceWD')}:`}</label>
                                        </p>
                                        <div className="col-xs-4">
                                            <Input type="radio"
                                                   id="withdrawAmount"
                                                   name="withdrawAmount"
                                                   className="form-control"
                                                   defaultChecked>
                                                <span>{`${iCommon('mainWallet')} ${MAINWALLET}`}</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <p>Withdraw Limits:</p>
                                    {withdrawalMethod !== '' && <DepositLimit transactionMethod={withdrawalMethod}/>}
                                </FormContainer>

                                    <FormContainer title={iCommon('fcWDMethod')}>
                                        <PaymentTemplate data={withdrawalMethod} isWithdrawal={true}/>
                                        <img src={window.cmsMedia("Content/images/footer/secure.png")}/>
                                    </FormContainer>

                                    <BtnRed className="col-xs-2 pull-right"
                                            text={iCommon('cNext')}
                                            onClick={this._proceedPage} />
                                </div>
                                :
                                <div>{Loader}</div>
                            }
                        </div>
                    :
                        <WithdrawTemplate method={withdrawalMethod}
                                          wdAmount={WDAMOUNT}
                                          balance={MAINWALLET}
                                          details={PAYMENTMETHODDETAILS}
                                          withdraw={this._submit}
                                          goBack={this._goBack}
                                          updateWorldpayCardDetails={this._updateWorldpayCardDetails}/>
                }

            </div>
        );
    }
}

export default BaseComponent(Withdrawal);