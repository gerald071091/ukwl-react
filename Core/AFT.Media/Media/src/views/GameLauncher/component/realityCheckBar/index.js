/**
 * Created by Marnie.Palapar on 6/8/2017.
 */
import React from 'react';
import styles from './realityCheckBar.scss';
import iCommon from '../../common';
import rRealityCheck from 'res/realityCheck';

class RealityCheckBar extends React.Component {

    static propTypes = {
        realityCheckModal: React.PropTypes.func,
        shouldResumeTimer: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.timer = 0;
        this._clearTimer = this._clearTimer.bind(this);
        this._startTimer = this._startTimer.bind(this);
        this._convertMinsHours = this._convertMinsHours.bind(this);
        this._tick = this._tick.bind(this);
        this._getRealityCheckTime = this._getRealityCheckTime.bind(this);
    }

    state = {
        date: new Date(),
        hours: new Date().getHours(),
        mins: new Date().getMinutes(),
        currentTime: (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) +
        ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()),
        sessionTime: {
            hours: 0,
            secs: 0,
            mins: 0
        },
        endSessionTime: 0
    };

    componentDidMount() {
        this._getRealityCheckTime();
        this._startTimer()
    }

    componentWillUpdate(nextProps, nextState) {
        const convertedHrs = this.state.sessionTime.hours * 60,
              convertedTime = this.state.sessionTime.hours + ':' + this.state.sessionTime.mins + ':' + this.state.sessionTime.secs;

        if(this.state.endSessionTime !== 0) {
            //convert to mins the this.state.sessionTime.secs
            if(this.state.sessionTime.secs === this.state.endSessionTime || convertedHrs === this.state.endSessionTime) {
                this.props.realityCheckModal(convertedTime, this.state.endSessionTime);
                this._clearTimer();
            }

            else if(nextProps.shouldResumeTimer) {
                this._startTimer();
            }
        }

        return (
            nextState.endSessionTime !== this.state.endSessionTime ||
            nextProps.shouldResumeTimer !== this.props.shouldResumeTimer
        )
    }

    componentWillUnmount() {
       this._clearTimer();
    }

    _clearTimer() {
        clearInterval(this.timer);
    }

    _getRealityCheckTime() {
        rRealityCheck.getRealityCheck()
            .done((response) =>{
                this.setState({
                    endSessionTime: response.alertTime
                })
            })
            .fail((jqXHR, textStatus, errMsg) => {
                console.log(jqXHR, textStatus, errMsg);
            });
    }

    _convertMinsHours(baseTime, time) {
        const converterLimit = 59;

        if(baseTime === converterLimit && time < converterLimit) {
            time += 1;
        }
        else if(time === converterLimit) {
            time = 0;
        }

        return time;
    }

    _startTimer() {
        this._clearTimer();
        this.timer = setInterval(this._tick, 100);
    }

    _tick() {
        this.setState({
            date: new Date(),
            hours: this.state.date.getHours(),
            mins: this.state.date.getMinutes(),
            secs: this.state.date.getMinutes(),
            currentTime: (this.state.hours < 10 ? '0' + this.state.hours : this.state.hours) +
                        ':' + (this.state.mins < 10 ? '0' + this.state.mins : this.state.mins),
            sessionTime: {
                secs: (this.state.sessionTime.secs < 59) ? this.state.sessionTime.secs + 1 : 0,
                mins: this._convertMinsHours(this.state.sessionTime.secs, this.state.sessionTime.mins),
                hours: this._convertMinsHours(this.state.sessionTime.mins, this.state.sessionTime.hours)
            }
        });
    }

    render() {
        return (
            <div className={`${styles.realityCheckBar} text-center`}>
                <div className={styles.realityCheckBarText}>
                    <p>{iCommon('sessionTime')} :
                        <span>0{this.state.sessionTime.hours}
                            : {this.state.sessionTime.mins < 10 ? '0' : ''}{this.state.sessionTime.mins}
                            : {this.state.sessionTime.secs < 10 ? '0' : ''}{this.state.sessionTime.secs}
                        </span>
                    </p>
                    <p>{iCommon('currentTime')} :
                        <span>{this.state.currentTime}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default RealityCheckBar;