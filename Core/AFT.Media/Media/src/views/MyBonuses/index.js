/**
 * Created by isabella.inosantos on 6/7/2017.
 */


import React from 'react';

import BaseComponent from 'base-component';
import rAccounts from 'res/accounts';
import rBonuses from 'res/bonuses';

import iCommon from './common';
import iMessages from './messages';

import FormContainer from 'comp/FormContainer';


class MyBonuses extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func,
		openModal: React.PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	state = {
		balances: [],
		playerName: '',
		products: []
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "My Bonuses");

		rAccounts.details().done((response) => {
			this.setState({ playerName: response.user.firstName + ' ' + response.user.lastName });
		});

		rBonuses.bettingBalances()
			.done((res) => {
				this.setState({
					balances: res.balances
				}, ()=> {
					let prodArray = [];
					let currProducts = $.grep(this.state.balances, (val) => {
						return val.product === "amaya";
					})[0];

					prodArray.push(currProducts);
					this.setState({ products: prodArray });
				});
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(errMsg)
			});
	}

	render() {

		return (
			<div>
				<h2 className="mainTitle">{iCommon('fMyBonuses')}</h2>
				<p>
					Welcome <span className="red">{this.state.playerName}</span>! <br />
				</p>
				<p>{iMessages('bonusBalanceMsg')}</p>
				<FormContainer title={iCommon('tBonusBalances')}>
					{
						this.state.products.map((data, i) => {
							return (
								<div className="row" key={i}>
									<div className="col-xs-4">
										<label>{iCommon(data.product)}</label>
									</div>
									<div className="col-xs-3">
										{window.currencySymbol}{data.bonus}
									</div>
									<div className="col-xs-4">
										{data.bonusStatus}
									</div>
								</div>
							)
						})
					}
				</FormContainer>
				<p>{iMessages('bettingBonusMsg')}</p>
				<FormContainer title={iCommon('tBettingBalance')}>
					{
						this.state.products.map((data, i) => {
							return (
								<div className="row" key={i}>
									<div className="col-xs-4">
										<label>{iCommon(data.product)}</label>
									</div>
									<div className="col-xs-3">
										{window.currencySymbol}{data.betting}
									</div>
									<div className="col-xs-4">
										{data.bonusStatus}
									</div>
								</div>
							)
						})
					}
					<img src={window.cmsMedia("Content/images/secure.png")} />
				</FormContainer>
			</div>
		);
	}
}

export default BaseComponent(MyBonuses);