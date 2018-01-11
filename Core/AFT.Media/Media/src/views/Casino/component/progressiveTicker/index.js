/**
 * Created by Marnie.Palapar on 6/14/2017.
 */
import React from 'react';
import styles from '../Desktop/progressiveTicker.scss';
import iCommon from 'nls/common';

class ProgressiveTicker extends React.Component {

    static propTypes = {
        jackpotTickerObject: React.PropTypes.array,
        jackpotTickerKey: React.PropTypes.number,
        gameId: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.ticker = 0;
        this._startJackpotTickers = this._startJackpotTickers.bind(this);
        this._tick = this._tick.bind(this);
    }

    state = {
        jackpotTickerValue: 0,
        jackpotTickerKey: 0
    };

    componentDidMount() {
        const DIVISOR = 100, jackpotTickerKey = this.props.jackpotTickerKey;

        if(this.props.jackpotTickerObject !== undefined) {
            this.setState({
                jackpotTickerKey: this.props.jackpotTickerKey,
                jackpotTickerValue: parseFloat(this.props.jackpotTickerObject[jackpotTickerKey].jackpotCValue) / DIVISOR
            });

            clearInterval(this.ticker);
            this._startJackpotTickers();
        }
    }

    componentWillUnmount() {
        clearInterval(this.ticker);
    }

    _startJackpotTickers() {
        const TIMEINTERVAL = 1000;

        this.ticker = setInterval(this._tick, this.props.jackpotTickerObject[this.state.jackpotTickerKey].changeTime * TIMEINTERVAL)
    }

    _tick() {
        const CENTAVOS = 0.01;

        let tickerValue = this.state.jackpotTickerValue,
            newJackpotTickerValue = parseFloat(tickerValue + this.props.jackpotTickerObject[this.state.jackpotTickerKey].valueDiff * CENTAVOS);

        this.setState({ jackpotTickerValue: newJackpotTickerValue });
    }

    render() {
        const DECIMALPLACES = 2;
        let jackpotTicker = this.state.jackpotTickerValue.toFixed(DECIMALPLACES),
            jackpotTickerValue = jackpotTicker.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            jackpotCurrency = window.currencySymbol === undefined ? '€' : window.currencySymbol;

        return (
            <div className={styles.jackpotTicker}>
                {iCommon('cJackpot')} &nbsp;
                {jackpotCurrency} &nbsp;
                {jackpotTickerValue}
            </div>
        )
    }
}

export default ProgressiveTicker;