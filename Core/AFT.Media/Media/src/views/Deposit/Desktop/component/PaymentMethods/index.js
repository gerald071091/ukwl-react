/**
 * Created by bernard.molina on 5/30/2017.
 */
import React from 'react';
import PaymentTemplate from 'comp/PaymentTemplate';
import iCommon from '../../../../Deposit/common';
import {Link} from 'react-router';

import styles from './paymentMethod.scss';

class PaymentMethods extends React.Component {
	static propTypes = {
		paymentMethods: React.PropTypes.array,
		radioButton: React.PropTypes.bool,
		onClick: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._selectedMethod = this._selectedMethod.bind(this);
	}

	state = {
		selectedMethod: ''
	}

	_selectedMethod(data){
		this.setState({ selectedMethod: data});
	}

	render() {
		return (
			<div className={styles.methodHolder}>
				<div className={styles.details}>
					details
				</div>

				{this.props.paymentMethods.map((data, key) => {
					return (
						<PaymentTemplate
							key={key}
							showOnetap={true}
							onClick={this._selectedMethod}
							radioButton={true} data={data} />
					)
				})}

				<div className={styles.nextBtn}>
					<Link to={`/${window.cultureCode}/deposit/${this.state.selectedMethod}`}>{iCommon('cNext')}</Link>
				</div>

				<div className={styles.clear} />

				<p>{iCommon('dInAccordanceText')}</p>
			</div>
		)
	}
}

export default PaymentMethods;