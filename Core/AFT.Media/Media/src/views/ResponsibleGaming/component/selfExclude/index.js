/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';

import iCommon from '../../common';
import enums from './enums';

import Input from 'comp/Input';
import Select from 'comp/Select';

import validation from 'helpers/validation';
import utils from 'helpers/utils';

import styles from '../../responsiblegaming.scss';

class SelfExclude extends React.Component {
    static propTypes = {
        getDaysValue: React.PropTypes.func,
        getMsgObj: React.PropTypes.func,
        submit: React.PropTypes.func,
        disableFields: React.PropTypes.func,
        dsbldSelectSE: React.PropTypes.bool,
        cbSEVal: React.PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.obj = {
            msg:   <div>
                    <p dangerouslySetInnerHTML={{__html: iCommon('rgSelfExcludeModalMsg')}}></p>
                    <div id={styles.brandlistContainer}>
                        {enums.brands.map((brand, key) => {
                            return (
                                <div className="row" key={key} name={`${brand.prefix}-container`} data-site={brand.text}>
                                    <div className="col-xs-6 text-center">
                                        <div className="col-xs-6 text-left pull-right">
                                            <Input type="checkbox"
                                                   onChange={brand._onChange}>
                                                <span>&nbsp;{brand.text}</span>
                                            </Input>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <Input type="text"
                                               className="col-xs-6"
                                               placeholder="Username*"
                                               onBlur={this._onBlur}
                                               disabled>
                                        </Input>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    </div>,
            title: 'TGP Accounts'
        };

        this._enableSelect = this._enableSelect.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.getMsgObj.name !== "EMPTYFUNC") {
            nextProps.getMsgObj(this.obj);
            this.props.getDaysValue(180);
        }

        if(nextProps.cbSEVal !== this.props.cbSEVal) {
            document.getElementById('cb-selfexclude').checked = nextProps.cbSEVal;
        }
    }

    _enableSelect(e) {
        let isChecked = e.target.checked ? true : false;
        this.props.disableFields({value: isChecked, type: e.target.id});
    }

    _onBlur (e) {
        let target = e.target,
        err = validation.isUsernameValid(target.value);

        utils.addValidError(err, target);
    }

    render() {
        return(
            <div className={`${styles.formGroup} row`}>
                <div className="col-xs-3">
                    <Input id="cb-selfexclude"
                           type="checkbox"
                           onChange={this._enableSelect}
                           defaultChecked={this.props.cbSEVal}>
                        <span>&nbsp;{iCommon('rgSelfExclude')}</span>
                    </Input>
                </div>
                <div className="col-md-4">
                    <Select id="sb-selfexclude"
                        options={enums.duration}
                        pKey="value"
                        value="text"
                        disabled={this.props.dsbldSelectSE}
                        onChange={this.props.getDaysValue} />
                </div>
            </div>
        );
    }
}

export default SelfExclude;