/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import iCommon from './common';
import rUtility from 'res/util';

import styles from './rtp.scss';

class RTP extends React.Component {

    static propTypes = {
        getText: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this._getRTPList = this._getRTPList.bind(this);
    }

    state = {
        rtpList: []
    };

    componentDidMount() {
        this.props.getText('sidebarHelp', "RTPs");

        this._getRTPList();
    }

    _getRTPList(){
        rUtility.getRtpList()
            .done((rtn) => {
                this.setState({rtpList: rtn.gameRtp });
            });
    }

    render() {

        return(
            <div id={styles.rtpContainer}>
                <h2 className="mainTitle">{iCommon('headerTitle')}</h2>
                <table>
                    <thead>
                    <tr>
                        <th>{iCommon('thGameName')}</th>
                        <th>{iCommon('thReturnRatio')}</th>
                        <th>{iCommon('thProvider')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rtpList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.gameName}</td>
                                <td>{val.rtp}</td>
                                <td>
                                    <div>
                                        {val.provided === iCommon('pMicrogaming') ?
                                            <img src={`${window.cmsMedia('Content/images/casino/gameVendors/MicrogamingLogoRGB.png')}`}/>
                                        : val.provided === iCommon('pMultislot') || val.provided === iCommon('rtpPVegas') ?
                                            <img src={`${window.cmsMedia('Content/images/casino/gameVendors/Multislot-logo.png')}`}/>
                                        : val.provided === iCommon('pRSG') ?
                                            <img src={`${window.cmsMedia('Content/images/casino/gameVendors/RSG-logo.png')}`}/>
                                        : val.provided === iCommon('pRedTiger') ?
                                            <img src={`${window.cmsMedia('Content/images/casino/gameVendors/RED-TIGER-LOGO_150x37.png')}`}/>
                                        : <span>{val.provided}</span>
                                        }
                                    </div>
                                </td>
                            </tr>
                        );

                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RTP;