/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import iCommon from './common';
import DepositLimit from 'comp/DepositLimit';
import FormContainer from 'comp/FormContainer';

class DepositAndWithdrawal extends React.Component {

    static propTypes = {
        getText: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._getStaticContent = this._getStaticContent.bind(this);
        this._netellerMarkup = this._netellerMarkup.bind(this);
        this._skrillMarkup = this._skrillMarkup.bind(this);
        this._worldpayMarkup = this._worldpayMarkup.bind(this);
        this._withdrawalMarkup = this._withdrawalMarkup.bind(this);
    }

    state = {
        content: ''
    }

    componentDidMount() {
        this.props.getText('sidebarHelp', iCommon('dawHeaderTitle'));
        this._getStaticContent();
    }

    _getStaticContent() {
        $.ajax({
            url: `${window.cmsMedia("Content/static-pages/depositandwithdrawal.html")}`,
            dataType: 'html',
            type: 'GET'
        }).done((res) => {
            this.setState({content: res});
        });
    }

    _netellerMarkup() {
        return (
            <section className="form-container content-section form__body">
                <div dangerouslySetInnerHTML={{__html: iCommon('netellerMarkup')}}></div>

                <DepositLimit transactionMethod={iCommon('payNeteller')}/>

            </section>
        )
    }

    _skrillMarkup() {
        return (
            <section className="form-container content-section form__body">
                <div dangerouslySetInnerHTML={{__html: iCommon('skrillMarkup')}}></div>

                <DepositLimit transactionMethod={iCommon('paySkrill')}/>

            </section>
        )
    }

    _worldpayMarkup() {
        return (
            <section className="form-container content-section form__body">
                <div dangerouslySetInnerHTML={{__html: iCommon('worldpayMarkup')}}></div>

                <DepositLimit transactionMethod={iCommon('payWorldpay')}/>

                <br style={{clear: 'both'}} />
            </section>
        )
    }

    _withdrawalMarkup() {
        return (
            <section className="form-container content-section form__body">
                <div dangerouslySetInnerHTML={{__html: iCommon('withdrawalMarkup')}}></div>
            </section>
        )
    }

    render() {
        return(
            <div>
                <h2 className="mainTitle">{iCommon('headerTitle')}</h2>
                <div>
                    {!window.isMobile ?
                        <FormContainer title={iCommon('payNeteller')}>
                            {this._netellerMarkup()}
                        </FormContainer>
                        : this._netellerMarkup()
                    }
                    <br/>
                    {!window.isMobile ?
                        <FormContainer title={iCommon('paySkrill')}>
                            {this._skrillMarkup()}
                        </FormContainer>
                        : this._skrillMarkup()
                    }
                    <br/>
                    {!window.isMobile ?
                        <FormContainer title={iCommon('payWorldpay')}>
                            {this._worldpayMarkup()}
                        </FormContainer>
                        : this._worldpayMarkup()
                    }
                    <br/>
                    {!window.isMobile ?
                        <FormContainer title="Withdrawals">
                            {this._withdrawalMarkup()}
                        </FormContainer>
                        : this._withdrawalMarkup()
                    }
                </div>
            </div>
        );
    }
}

export default DepositAndWithdrawal;