/**
 * Created by Marnie.Palapar on 5/23/2017.
 */
import React from 'react';
/*import { Link } from 'react-router';*/
import { BtnRed, BtnGreen } from 'comp/Button';
import ProgressiveTicker from '../progressiveTicker';
import LazyImage from 'comp/LazyImage';
import iCommon from 'nls/common';
import styles from '../Desktop/gameLobby.scss';

class GameLobby extends React.Component {

	static propTypes = {
		selectedGames: React.PropTypes.array,
		checkAuthed: React.PropTypes.func,
		jackpotObject: React.PropTypes.array
	};

	constructor(props) {
		super(props);
		this._checkVendorCDN = this._checkVendorCDN.bind(this);
		this._getRealPlayLink = this._getRealPlayLink.bind(this);
		this._getDemoPlayLink = this._getDemoPlayLink.bind(this);
		this._showJackpotTickers = this._showJackpotTickers.bind(this);
	}

	_checkVendorCDN(vendorId) {
		const MULTISLOTSCDN = 'https://cdn.cdnmanager.info/_gameicons/multislots/',
			MICROGAMINGCDN = 'https://cdn.cdnmanager.info/_gameicons/microgaming/',
			UGSCDM = 'https://cdn.cdnmanager.info/_gameicons/ugs/';

		let cdn = '';

		switch (vendorId) {
			case 18:
				cdn = MICROGAMINGCDN;
				break;
			case 111:
				cdn = MULTISLOTSCDN;
				break;
			case 777:
				cdn = UGSCDM;
				break;
		}

		return cdn;
	}

	_getDemoPlayLink(item) {
		let cultureCode = `/${window.cultureCode}`,
			gameProvider = `/GameLauncher?provider=${item.vendorName}&id=${item.subGameId}`,
			gameInfo = `&cat=${item.launchGameType}&name=${item.name}&gameId=${item.launchGameId}`,
			gameType = `&type=${item.vendorGameType}&f=f`,
			demoPlayLink = `${cultureCode}${gameProvider}${gameInfo}${gameType}`;

		return <a href={demoPlayLink} target="_blank"><span>{iCommon('bDemo')}</span></a>;
	}

	_getRealPlayLink(item) {
		let cultureCode = `/${window.cultureCode}`,
			gameProvider = `/GameLauncher?provider=${item.vendorName}&id=${item.subGameId}`,
			gameInfo = `&cat=${item.launchGameType}&name=${item.name}`,
			gameType = `&gameId=${item.launchGameId}&type=${item.vendorGameType}`,
			realPlayLink = `${cultureCode}${gameProvider}${gameInfo}${gameType}`,
			anchorLink = '';

		if (window.authed) {
			anchorLink = <a href={realPlayLink} target="_blank"><span>{iCommon('bPlayNow')}</span></a>;
		} else {
			anchorLink = <a><span>{iCommon('bPlayNow')}</span></a>;
		}

		return anchorLink;
	}

	_showJackpotTickers(item, i) {

		let jackpotDiv = '',
			isJackPot = this.props.jackpotObject !== undefined && item.categoryName.toUpperCase() === 'JACKPOTS' ,
			showJackpot = i < this.props.jackpotObject.length && item.launchGameId.toString() === this.props.jackpotObject[i].jackpotId;

		if(isJackPot && showJackpot) {
			jackpotDiv = <ProgressiveTicker jackpotTickerObject={this.props.jackpotObject}
			                   jackpotTickerKey={i} jackpotGameId={item.launchGameId.toString()}/>;
		} else {
			jackpotDiv = '';
		}

		return jackpotDiv;
	}

	render() {
		return (
			<div className={`${styles.row} center-block`}>
				{this.props.selectedGames.map((item, i) => {

						let imageCDN = this._checkVendorCDN(item.vendorId),
							realPlayLink = this._getRealPlayLink(item),
							demoPlayLink = this._getDemoPlayLink(item),
							showJackpotTickers = this._showJackpotTickers(item, i);

						return (
							<div className={`col-xs-3 ${styles.game}`} key={i}>
								<h2>{item.name}</h2>
								<LazyImage src={`${imageCDN}${item.imageSrc}`} alt={item.name}/>

								<div className={styles.casinoButtons}>
									<BtnRed className={styles.btnRed} name={iCommon('bPlayNow')}
									        onClick={this.props.checkAuthed}>
										{realPlayLink}
									</BtnRed>

									{item.vendorId !== 777 &&
										<BtnGreen className={styles.btnGreen} name={iCommon('bDemo')}>
											{demoPlayLink}
										</BtnGreen>
									}
								</div>

								{showJackpotTickers}

							</div>
						)
					}
				)
				}
			</div>
		)
	}
}

export default GameLobby;