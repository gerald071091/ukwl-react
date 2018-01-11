/* Created by bernard.molina on 5/18/2017.
 */
import React from 'react';
import DDeposit from './Desktop';
import rDeposit from 'res/deposit';

class Deposit extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		paymentMethods: React.PropTypes.array
	};

	constructor(props) {
		super(props);

		this._getPaymentMethod = this._getPaymentMethod.bind(this);
	}

	state = {
		paymentMethods: []
	};

	componentDidMount() {
		this.props.getText('sidebarSettings', "Deposit");
		this._getPaymentMethod();
	}

	_getPaymentMethod(){
		rDeposit.methodsAvailable()
			.done((data) => {
				this.setState({ paymentMethods: data.methods })
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}


	render() {
		return (
			<div>
				<DDeposit paymentMethods={this.state.paymentMethods} />
			</div>
		)
	}
}

export default Deposit;
