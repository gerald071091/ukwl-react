/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';

import iCommon from '../../common';
import enums from './enums';

import Input from 'comp/Input';
import Select from 'comp/Select';

import styles from '../../responsiblegaming.scss';

class TimeOut extends React.Component {
    static propTypes = {
        getDaysValue: React.PropTypes.func,
        getMsgObj: React.PropTypes.func,
        submit: React.PropTypes.func,
        disableFields: React.PropTypes.func,
        dsbldSelectTO: React.PropTypes.bool,
        cbTOVal: React.PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.obj = {
            msg:
                <div dangerouslySetInnerHTML={{__html: iCommon('rgTimeOutModalMsg')}}></div>,
            title: 'Notice'
        };

        this._enableSelect = this._enableSelect.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.getMsgObj.name !== "EMPTYFUNC") {
            nextProps.getMsgObj(this.obj);
            this.props.getDaysValue(1);
        }

        if(nextProps.cbTOVal !== this.props.cbTOVal) {
            document.getElementById('cb-timeout').checked = nextProps.cbTOVal;
        }
    }

    _enableSelect(e) {
        let isChecked = e.target.checked ? true : false;
        this.props.disableFields({value: isChecked, type: e.target.id});
    }

    render() {

        return(
            <div className={`${styles.formGroup} row`}>
                <div className="col-xs-3">
                    <Input id="cb-timeout"
                           type="checkbox"
                           onChange={this._enableSelect}
                            defaultChecked={this.props.cbTOVal}>
                        <span>&nbsp;{iCommon('rgTimeOut')}</span>
                    </Input>
                </div>
                <div className="col-md-4">
                    <Select id="sb-timeout"
                        options={enums.duration}
                        pKey="value"
                        value="text"
                        disabled={this.props.dsbldSelectTO}
                        onChange={this.props.getDaysValue} />
                </div>
            </div>
        );
    }
}

export default TimeOut;