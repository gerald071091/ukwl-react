/**
 * Created by bernard.molina on 6/19/2017.
 */
import React from 'react';
import rDeposit from 'res/deposit';
import iCommon from '../../../../Deposit/common';

class MoneyBooker extends React.Component{
	static propTypes = {
		params: React.PropTypes.func,
		location: React.PropTypes.string,
		route: React.PropTypes.string,
		getText: React.PropTypes.func
	};

	constructor(props){
		super(props);

		this._getSkrillStatus = this._getSkrillStatus.bind(this);
	}

	state = {
		transactionId: '',
		depositStatus: -1,
		payment: ''
	};

	componentDidMount(){
		this._getSkrillStatus();
		this.props.getText('sidebarSettings', "Deposit");
	}

	_getSkrillStatus(){
		let attempt = 5,
			maxTry = 10;

		this.setState({
			transactionId: this.props.location.query.tn
		});

		rDeposit.skrillStatus(this.state.transactionId, attempt, maxTry)
			.done((data)=> {
				if(data.depositForm === null || typeof(data.depositForm) === "undefined"){
					this.setState({
						depositStatus: 1,
						payment: data.payment
					});
				}
			})
			.fail((jqXHR, textStatus, errMsg) => {
				this.setState({ depositStatus: 0 });
				console.log(jqXHR, textStatus, errMsg);
			});
	}


	render(){
		let isOnetap = this.props.route && this.props.route.skrillOnetap,
			isNeteller = this.props.route && this.props.route.neteller,
			refenceNum = '',
			amt = '',
			balance = '';

			if(isOnetap){
				refenceNum = this.props.location.query.r;
				amt = this.props.location.query.a;
				balance = this.props.location.query.b;
			} else if (isNeteller){
				refenceNum = this.props.location.query.r;
				amt = this.props.location.query.a;
				balance = this.props.location.query.b;
			}
			else{
				refenceNum = this.state.payment.referenceNumber;
				amt = this.state.payment.amount;
				balance = this.state.payment.balance;
			}


		let Success =
			<div>
				<h1 className="mainTitle">{iCommon('depSuccess')}</h1>
				<p>{iCommon('depSuccessMsg')}</p>

				<div className="row">
					<p className="col-xs-3">{iCommon('depRefNumber')}</p>
					<p className="col-xs-9">{refenceNum}</p>
				</div>

				<div className="row">
					<p className="col-xs-3">{iCommon('depAmount')}</p>
					<p className="col-xs-9">{amt}</p>
				</div>

				<div className="row">
					<p className="col-xs-3">{iCommon('depCurrBalance')}</p>
					<p className="col-xs-9">{balance}</p>
				</div>
			</div>,

			Failed =
				<div>
					<h1>{iCommon('hDeposit')}</h1>

					<p>{iCommon('depPendingStatus')}</p>

					<p>{iCommon('depContactSupport')}</p>
				</div>;

		let content = {
			'-1': '',
			'0': Failed,
			'1': Success
		}[this.state.depositStatus.toString()];

		return (
			<div>
				{content}
			</div>
		)
	}
}

export default MoneyBooker;