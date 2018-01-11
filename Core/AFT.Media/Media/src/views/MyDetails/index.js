/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';
import format from 'string-format';

import utils from 'helpers/utils';
import iCommon from './common';
import iMessages from './messages';
// import utils from 'helpers/utils';
import validation from './validation';

import BaseComponent from 'base-component';
import { BtnRed } from 'comp/Button';
// import Input from 'comp/Input';
import FormContainer from 'comp/FormContainer';
import ChangePassword from './component/ChangePassword';
import PromotionsSubscription from './component/PromotionsSubscription';

import rAccounts from 'res/accounts';
import rSubscription from 'res/subscription';
import rChangePassword from 'res/changepassword';

import styles from './mydetails.scss';

let errArr = {};

class MyDetails extends React.Component {
    static propTypes = {
        getText: React.PropTypes.func,
        openModal: React.PropTypes.func,
        closeModal: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._init = this._init.bind(this);
        this._checkPromotionSubscription = this._checkPromotionSubscription.bind(this);
        this._showChangePassword = this._showChangePassword.bind(this);
        this._submitPromoSubscription = this._submitPromoSubscription.bind(this);
        this._validateChangePW = this._validateChangePW.bind(this);
        this._updatePassword = this._updatePassword.bind(this);
    }

    state = {
        userDetails: {},
        cbPromoSubscription: false,
        changePWClicked: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    componentWillMount(){
        this.props.openModal({showLoader: true});
        this._init();
    }

    componentDidMount() {
        this.props.getText('sidebarSettings', "My Details");
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            nextState.userDetails !== this.state.userDetails ||
            nextState.oldPassword !== this.state.oldPassword ||
            nextState.newPassword !== this.state.newPassword ||
            nextState.changePWClicked !== this.state.changePWClicked ||
            nextState.cbPromoSubscription !== this.state.cbPromoSubscription
        )
    }

    _checkPromotionSubscription() {
        this.setState({cbPromoSubscription: !this.state.cbPromoSubscription});
    }

    _validateChangePW(e) {
        let target = typeof e !== 'undefined' ? e.target : document.querySelectorAll('input[type="password"]');

        let validatePW = (params, element) => {
            switch(params) {
                case 'oldPassword': {
                    let validatePW = validation.password(element.value);
                    validatePW === '' ? delete errArr.oldPW : errArr.oldPW = validatePW;
                    this.setState({oldPassword: element.value});
                    utils.addValidError(!validatePW, element)
                    break;
                }
                case 'newPassword': {
                    let validatePW = validation.password(element.value);
                    let validateNewPW = validation.newPWValidation(element.value, this.state.oldPassword, validatePW);
                    validateNewPW === '' ? delete errArr.newPW : errArr.newPW = validateNewPW;
                    this.setState({newPassword: element.value});
                    utils.addValidError(!validateNewPW, element)
                    break;
                }
                case 'confirmPassword': {
                    let validatePW = validation.password(element.value);
                    let validateCFPW = validation.confirmPWValidation(element.value, this.state.newPassword, validatePW);
                    validateCFPW === '' ? delete errArr.cfPW : errArr.cfPW = validateCFPW;
                    this.setState({confirmPassword: element.value});
                    utils.addValidError(!validateCFPW, element)
                    break;
                }
            }
        }
        if(typeof target.length === 'undefined') {
            validatePW(target.name, target);
        }
        else {
            for(let x = 0; x < target.length; x++) {
                validatePW(target[x].name, target[x]);
            }
        }
        // (Object.keys(errArr).length > 0) ? utils.addValidError(false, target) : utils.addValidError(true, target);
        return (Object.keys(errArr).length > 0 ? false : true)
    }

    _init() {
        let tmpObj = {};
        $.when(
            rAccounts.details(),
            rSubscription.getSubscriptions()
        )
        .done((v1, v2) => {
            const USER = v1[0].user;
            let ISSUBSCRIBED = false;
            tmpObj.fullName = `${USER.firstName} ${USER.lastName}`;
            tmpObj.username = USER.username;
            tmpObj.address = USER.addressLine1;
            tmpObj.postalCode = USER.postalCode;
            tmpObj.townCity = USER.city;
            tmpObj.country = USER.country;
            tmpObj.mobile = USER.mobileNumber;
            tmpObj.email = USER.email;

            ISSUBSCRIBED = (v2[0].subscription.email || v2[0].subscription.sms || v2[0].subscription.post);

            this.setState({userDetails: tmpObj,
                    cbPromoSubscription: ISSUBSCRIBED},
                this.props.closeModal());
        })
        .fail((jqXHR, textStatus, errMsg) => {
            this.props.openModal({msg: errMsg,
                title: iCommon('cError') })
        })
    }

    _showChangePassword() {
        this.setState({changePWClicked: !this.state.changePWClicked })
    }

    _submitPromoSubscription() {
        const SUBSCRIPTION = this.state.cbPromoSubscription;

        let data = {};

        if(SUBSCRIPTION) {
            data.checkEmail = true;
            data.checkSMS = true;
            data.checkPost = true;
        }
        else {
            data.checkEmail = false;
            data.checkSMS = false;
            data.checkPost = false;
        }

        rSubscription.setSubscription(data.checkEmail, data.checkSMS, data.checkPost)
            .done((result) => {
                this.props.openModal({msg: result.message,
                    title: iCommon('cSuccess')})
            })
            .fail((jqXHR, textStatus, errMsg) => {
                this.props.openModal({msg: errMsg,
                    title: iCommon('cError') })
            })
    }

    _updatePassword() {
        const ISPASSWORDVALIDATED = this._validateChangePW();

        let data = {
            oldPW: this.state.oldPassword,
            newPW: this.state.newPassword
        }

        if(ISPASSWORDVALIDATED) {
            rChangePassword.changePassword(data.oldPW, data.newPW)
                .done(() => {
                    let clearFields = () => {
                        this.setState({oldPassword: '',
                            newPassword: '',
                            confirmPassword: '', }, this._showChangePassword);
                    }

                    this.props.openModal({msg: iMessages('passwordChangedSuccessfully'),
                        title: iCommon('cSuccess'),
                        okCallback: clearFields()})
                })
                .fail((jqXHR, textStatus, errMsg) => {
                    this.props.openModal({msg: errMsg,
                        title: iCommon('cError') })
                })
        }
        else {
            let tmp = [];
            for(let x in errArr) {
                tmp.push(errArr[x]);
            }
            let filteredArr = [...new Set(tmp)];
            let errMessages = filteredArr.map((errMsg, key) => {
                return (
                    <p key={key}>{errMsg}</p>
                )
            });
                this.props.openModal({msg: errMessages,
                    title: iCommon('cError') })
        }
    }

    render() {
        const USER = this.state.userDetails;
        let isChangePWClicked = this.state.changePWClicked;
        return(
            <div>
                <h2 className="mainTitle">{iCommon('headerTitle')}</h2>
                <p>{format(iCommon('welcomeMsg'), USER.fullName)}</p>
                <p dangerouslySetInnerHTML={{__html: format(iCommon('description'), window.siteName)}}></p>

                <FormContainer title={iCommon('namepwFormTitle')}>
                    <div className="form-group">
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Full Name:</label>
                            </p>
                            <p className="col-xs-7">{USER.fullName}</p>
                        </div>
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Login Name:</label>
                            </p>
                            <p className="col-xs-7">{USER.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-6 ${styles.columnLeftOffset} ${styles.btnMarginBottom}`}>
                                <BtnRed className="col-xs-5"
                                        text={iCommon('changePWBtn')}
                                        onClick={this._showChangePassword} />
                        </div>
                        {!isChangePWClicked
                        ?
                            <div className="col-xs-6">
                                <img src={window.cmsMedia("Content/images/footer/secure.png")}/>
                            </div>
                        :
                            <ChangePassword fieldHandler={this._validateChangePW}
                                            updatePassword={this._updatePassword}
                                            showPWStrength={this._showPWStrength}/>
                        }
                    </div>

                </FormContainer>

                <FormContainer title={iCommon('addressFormTitle')}>
                    <div className="form-group">
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Address:</label>
                            </p>
                            <p className="col-xs-7">{USER.address}</p>
                        </div>
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Postal Code:</label>
                            </p>
                            <p className="col-xs-7">{USER.postalCode}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Town/City:</label>
                            </p>
                            <p className="content-right col-xs-7">{USER.townCity}</p>
                        </div>
                        <div className="col-xs-6">
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Country:</label>
                            </p>
                            <p className="col-xs-7">{USER.country}</p>
                        </div>
                    </div>
                </FormContainer>

                <FormContainer title={iCommon('contactFormTitle')}>
                    <div className="form-group">
                        <div className={`col-xs-6 ${styles.columnRightOffset}`}>
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Mobile Number:</label>
                            </p>
                            <p className="content-right col-xs-7">{USER.mobile}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-6 ${styles.columnRightOffset}`}>
                            <p className="col-xs-5 no-pad">
                                <label className="control-label">Email Address:</label>
                            </p>
                            <p className="content-right col-xs-7">{USER.email}</p>
                        </div>
                    </div>
                </FormContainer>

                <FormContainer title={iCommon('subscriptionsFormTitle')}>
                    <PromotionsSubscription cbPromoSubscription={this.state.cbPromoSubscription}
                                            checkPromotionSubscription={this._checkPromotionSubscription}
                                            submitPromoSubscription={this._submitPromoSubscription}/>
                </FormContainer>
            </div>
        );
    }
}

export default BaseComponent(MyDetails);