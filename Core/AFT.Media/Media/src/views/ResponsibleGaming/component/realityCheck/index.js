/**
 * Created by gian.jamisola on 5/19/2017.
 */

import React from 'react';
import iCommon from '../../common';
import enums from './enums';
import Input from 'comp/Input';
import Select from 'comp/Select';
import {BtnBlue} from 'comp/Button';

import styles from '../../responsiblegaming.scss';

class RealityCheck extends React.Component {
    static propTypes = {
        playerStatus: React.PropTypes.string,
        dsbldRealityCheck: React.PropTypes.bool,
        cbRealityCheck: React.PropTypes.bool,
        disableFields: React.PropTypes.func,
        initializeRealityCheck: React.PropTypes.func,
        getRealityCheck: React.PropTypes.func,
        saveWithConfirmation: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this._enableSelect = this._enableSelect.bind(this);
    }

    componentDidMount() {
        this.props.playerStatus.toUpperCase() !== 'SUSPENDED' && this.props.initializeRealityCheck();
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.cbRealityCheck !== this.props.cbRealityCheck) {
            this.props.getRealityCheck(30);
        }

        if(nextProps.cbRealityCheck !== this.props.cbRealityCheck) {
            document.getElementById('cb-realitycheck').checked = nextProps.cbRealityCheck;
        }
    }

    _enableSelect(e) {
        let isChecked = e.target.checked ? true : false;
        this.props.disableFields({value: isChecked, type: e.target.id});
    }

    render() {
        return(
            <div>
                <div className={`${styles.formGroup} row`}>
                    <div className="col-xs-3">
                        <Input id="cb-realitycheck"
                               type="checkbox"
                               onChange={this._enableSelect}
                               defaultChecked={this.props.cbRealityCheck}>
                            <span>&nbsp;{iCommon('rgRealityCheck')}</span>
                        </Input>
                    </div>
                    <div className="col-md-4">
                        <Select id="sb-realitycheck"
                                options={enums.duration}
                                pKey="value"
                                value="text"
                                disabled={this.props.dsbldRealityCheck}
                                onChange={this.props.getRealityCheck}/>
                    </div>
                </div>
                <p>{iCommon('rgRCDescription')}</p>
                <div>
                    <BtnBlue id="rc-btn"
                             className="col-xs-2 pull-right"
                             text={iCommon('rgSave')}
                             onClick={this.props.saveWithConfirmation}/>
                </div>
            </div>
        );
    }
}

export default RealityCheck;