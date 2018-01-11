/**
 * Created by gian.jamisola on 5/5/2017.
 */
import React from 'react';
import BaseComponent from 'base-component';
import rCasino from 'res/casino';
import iCommon from 'nls/common';
import iMessages from 'nls/messages';
import Navigation from './component/navigation';
import GameLobby from './component/gameLobby';
import enums from './enums';

class Casino extends React.Component {

	static propTypes = {
		showLoader: React.PropTypes.func,
		closeLoader: React.PropTypes.func,
		openModal: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		getUrl: React.PropTypes.func
	};

	constructor(props) {
		super(props);
		this._checkAvailableProduct = this._checkAvailableProduct.bind(this);
		this._getAllGames = this._getAllGames.bind(this);
		this._getJackpotTickers = this._getJackpotTickers.bind(this);
		this._getSelectedCategory = this._getSelectedCategory.bind(this);
		this._checkAuthed = this._checkAuthed.bind(this);
		this._sortGames = this._sortGames.bind(this);
	}

	state = {
		navigation: [],
		games: [],
		selectedCategory: '',
		jackpotObject: []
	};

	componentDidMount() {
		this.props.getUrl("casino");
		this._getAllGames();
		this._checkAvailableProduct();
	}

	_checkAuthed() {
		if (!window.authed) {
			this.props.openModal({
				showLoader: false,
				title: iCommon('cNotice'),
				msg: iMessages('errLoginOrRegister')
			});
		} else {
			this.props.closeModal;
		}
	}

	_checkAvailableProduct(product) {
		if(window.authed) {
			rCasino.checkAvailable(product).done((response) => {
				console.log(response);
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
		}
	}

	_getAllGames() {
		this.props.showLoader();

		let navList = [], gameList = [], jackpotList = [],
			defaultCategory = '', currentPlatform = !window.iaMobile ? 0 : 1;

		rCasino.games().done((response) => {
			for (let item of response.games) {
				if (item.platform === currentPlatform) {
					gameList.push(item);
					navList.push({
						categoryName: item.categoryName,
						categoryOrderNumber: item.categoryOrderNumber
					});

					// && item.vendorId === 18 for microgaming
					if (item.categoryName.toUpperCase() === 'JACKPOTS') {
						jackpotList.push({
							//remove toString(), when microgaming is activated, add .replace(/\s/g, '')
							jackpotID: item.launchGameId.toString(),
							gameName: item.name,
						});
					}
				}

				defaultCategory = item.categoryOrderNumber === 0 && item.categoryName;
			}

			this._getJackpotTickers(jackpotList);

			this.setState({
				games: gameList,
				navigation: navList,
				selectedCategory: defaultCategory
			});

			this.props.closeLoader();
		})
		.fail((jqXHR, textStatus, errMsg) => {
			console.log(jqXHR, textStatus, errMsg);
		});
	}

	_getJackpotTickers(jackpotList) {
		let jackpotObjectList = [];

		const FILTERGAME = (tickerItem) => {
			return (jackpotList.find((jackpotItem) => tickerItem.jackpotID === jackpotItem.jackpotID));
		};

		const JACKPOTTICKERS = enums.JackpotTickers().filter(FILTERGAME);

		if (JACKPOTTICKERS.length !== 0) {
			for (let item of JACKPOTTICKERS) {
				rCasino.getProgressiveTicker(item.jackpotID).done((response) => {
					jackpotObjectList.push(response.progressiveTickers[0]);
				}).fail((jqXHR, textStatus, errMsg) => {
					console.log(jqXHR, textStatus, errMsg);
				});
			}

			this.setState({
				jackpotObject: jackpotObjectList
			});
		}
	}

	_getSelectedCategory(select) {
		this.setState({
			selectedCategory: select
		});
	}

	_sortGames() {
		let categoryGames = [];

		for (let item of this.state.games) {
			if (item.categoryName === this.state.selectedCategory) {
				categoryGames.push(item);
			}
		}

		if (this.state.selectedCategory.toUpperCase() === "SLOTS") {
			categoryGames = [...new Set(categoryGames)];
		} else {
			categoryGames.sort(function(a, b) {
				return a.name > b.name;
			});
		}

		return categoryGames;
	}

	render() {
		return (
			<div>
				<Navigation navigation={this.state.navigation} selectedCategory={this._getSelectedCategory}/>
				<GameLobby selectedGames={this._sortGames()} checkAuthed={this._checkAuthed}
				           jackpotObject={this.state.jackpotObject}/>
			</div>
		)
	}
}

export default BaseComponent(Casino);