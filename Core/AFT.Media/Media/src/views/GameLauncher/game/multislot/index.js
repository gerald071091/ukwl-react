/**
 * Created by Marnie.Palapar on 6/5/2017.
 */
import React from 'react';
import Iframe from 'comp/iframe';
import rCasino from 'res/casino';

class MultiSlotForm extends React.Component {

    static propTypes = {
        location: React.PropTypes.object,
        setUrl: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this._submitMultislotForm = this._submitMultislotForm.bind(this);
    }

    state = {
        multiSlotObj: {}
    };

    componentDidMount() {
        const {gameid, type} = this.props.location.query;

        rCasino.multislotUrl(gameid, type)
            .done((response) => {
                this.setState({multiSlotObj: response.game});
            })
            .fail((jqXHR, textStatus, errMsg) => {
                console.log(jqXHR, textStatus, errMsg);
            });
    }

    componentDidUpdate() {
        this._submitMultislotForm();
    }

    _submitMultislotForm() {
        if (this.state.multiSlotObj !== null) {
            let multiSlotForm = $('#multislot');
            multiSlotForm.submit();
        }
    }

    render() {
        let multiSlotForm =
            <form id='multislot' action={this.state.multiSlotObj.url} method='post'>
                <input type='hidden' id='Token' name='Token' value={`${this.state.multiSlotObj.token}`}/>
                <input type='hidden' id='Guid' name='Guid' value={`${this.state.multiSlotObj.guid}`}/>
                <input type='hidden' id='CasinoGameId' name='CasinoGameId' value={`${this.state.multiSlotObj.gameId}`}/>
                <input type='hidden' id='lang' name='lang' value={`${this.state.multiSlotObj.lang}`}/>
                <input type='hidden' id='AccountId' name='AccountId' value={`${this.state.multiSlotObj.accountId}`}/>
            </form>;
        return (
            <div>
                {multiSlotForm}
                {this.state.casinoUrl !== null ? <Iframe id="gameLauncher" src={this.state.casinoUrl}/> : ''}
            </div>
        )
    }
}

export default MultiSlotForm;