/**
 * Created by gian.jamisola on 6/6/2017.
 */

import React from 'react';

import iCommon from '../../common';

import { BtnRed } from 'comp/Button';
import Input from 'comp/Input';
import PasswordStrength from 'comp/PasswordStrength';

import styles from '../../mydetails.scss';

class ChangePassword extends React.Component {
    static propTypes = {
        fieldHandler: React.PropTypes.func,
        updatePassword: React.PropTypes.func
    }

    constructor(props){
        super(props);

        this._showPWStrength = this._showPWStrength.bind(this);
    }

    state = {
        newPassword: '',
        showPWStrength: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.showPWStrength !== this.state.showPWStrength ||
            nextState.newPassword !== this.state.newPassword
        )
    }

    _showPWStrength(e) {
        let target = e.target;
        target.value.length > 0 ? this.setState({showPWStrength: true, newPassword: target.value }) : this.setState({showPWStrength: false, newPassword: '' });
    }

    render() {
        return(
            <div id={styles.changePWContainer}>
                <div className="form-group">
                    <div className="col-xs-6">
                        <p className="col-xs-5 no-pad">
                            <label className="control-label">Current Password:</label>
                        </p>
                        <div className={`col-xs-7 ${styles.fieldMarginBottom}`}>
                            <Input type="password"
                                   id="oldPassword"
                                   name="oldPassword"
                                   className="form-control"
                                   onBlur={this.props.fieldHandler}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <p className="col-xs-5 no-pad">
                            <label className="control-label">New Password:</label>
                        </p>
                        <div className={`col-xs-7 ${styles.fieldMarginBottom}`}>
                            <Input type="password"
                                   id="newPassword"
                                   name="newPassword"
                                   className="form-control"
                                   onBlur={this.props.fieldHandler}
                                   onChange={this._showPWStrength}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-6">
                        <p className="col-xs-5 no-pad">
                            <label className="control-label">Password Strength</label>
                        </p>
                        <div className={`col-xs-7 ${styles.fieldMarginBottom}`}>
                            {this.state.showPWStrength && <PasswordStrength password={this.state.newPassword}/>}
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <p className="col-xs-5 no-pad">
                            <label className="control-label">Confirm Password:</label>
                        </p>
                        <div className={`col-xs-7 ${styles.fieldMarginBottom}`}>
                            <Input type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   className="form-control"
                                   onBlur={this.props.fieldHandler}/>
                        </div>
                    </div>
                </div>
                <div className="form-group clear">
                    <div className="col-xs-6">
                        <img src={window.cmsMedia("Content/images/footer/secure.png")}/>
                    </div>
                    <div className="col-xs-6">
                        <BtnRed className={`col-xs-2 pull-right ${styles.btnMarginBottom}`}
                                text={iCommon('updateBtn')}
                                onClick={this.props.updatePassword}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword;