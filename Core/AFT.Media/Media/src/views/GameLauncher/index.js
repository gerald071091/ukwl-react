/**
 * Created by gian.jamisola on 5/5/2017.
 */
import React from 'react';
import BaseComponent from 'base-component';
import Iframe from 'comp/iframe';
import rCasino from 'res/casino';
import RealityCheckBar from './component/realityCheckBar';
import iCommon from './common';
import format from 'string-format';
import styles from './gamelauncher.scss';

class GameLauncher extends React.Component {

    static propTypes = {
        location: React.PropTypes.object,
        openModal: React.PropTypes.func,
        closeModal: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this._launchMicrogaming = this._launchMicrogaming.bind(this);
        this._launchMultislot = this._launchMultislot.bind(this);
        this._realityCheckModal = this._realityCheckModal.bind(this);
        this._resumeGame = this._resumeGame.bind(this);
    }

    state = {
        casinoUrl: '',
        shouldResumeTimer: false
    };

    componentWillMount() {

        let gameId = this.props.location.query.gameId,
            gameUrl = this.props.location.search,
            provider = this.props.location.query.provider,
            gameType = (this.props.location.query.f === 'f') ? 'free-url' : 'real-url';

        switch(provider) {
            case 'multislot':
                this._launchMultislot(gameId, gameType);
                break;
            case 'microgaming':
                this._launchMicrogaming(gameId, gameUrl, gameType);
                break;
        }
    }

    shouldComponentUpdate(nextState) {
        return (
            nextState.casinoUrl !== this.state.casinoUrl ||
            nextState.shouldResumeTimer !== this.state.shouldResumeTimer
        )
    }

    _resumeGame() {
        this.setState({ shouldResumeTimer: true });
        this.props.closeModal();
    }

    _launchMicrogaming(gameId, lobbyUrl, type) {
        rCasino.microgamingUrl(gameId, lobbyUrl, type)
            .done((response) => {
                this.setState({casinoUrl: response.game.url});
            })
            .fail((jqXHR, textStatus, errMsg) => {
                console.log(jqXHR, textStatus, errMsg);
            });
    }

    _launchMultislot(gameId, gameType) {
        this.setState({casinoUrl: `/${window.cultureCode}/GameLauncher/game/multislot?gameid=${gameId}&type=${gameType}`});
    }

    _realityCheckModal(realityCheckMinutes, endSessionTime) {
        const hereLink = window.isMobile ? "mobile/gamehistory" : "MyWallet";
        const realityCheckMessage =
            (<div className={`${styles.realityCheckContent} text-left`}>
                <h3 className="text-center">{iCommon('realityCheck')}</h3>
                <div dangerouslySetInnerHTML={{__html: format(iCommon('realityCheckBody'), realityCheckMinutes, endSessionTime, hereLink)}}/>
                <ul className="list-inline">
                    <li><button className={styles.bEndSession} onClick={() => window.close()}>{iCommon('bEndSession')}</button></li>
                    <li><button className={styles.bContinue} onClick={this._resumeGame}>{iCommon('bContinue')}</button></li>
                </ul>
            </div>);

        this.props.openModal({
            showLoader: false,
            isPlain: true,
            modalClassName: `${styles.realityCheckModal}`,
            msg: realityCheckMessage
        });
    }

    render() {
        return (
            <div>
                {this.state.casinoUrl !== null ?
                    <Iframe id="gameLauncher" src={this.state.casinoUrl}
                            children={(this.props.location.query.f === 'f') ? '' :
                            <RealityCheckBar realityCheckModal={this._realityCheckModal}
                                             shouldResumeTimer={this.state.shouldResumeTimer}/>}/> : ''
                }
            </div>
        );
    }
}

export default BaseComponent(GameLauncher);

