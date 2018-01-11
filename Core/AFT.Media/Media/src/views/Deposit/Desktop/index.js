/**
 * Created by bernard.molina on 5/18/2017.
 */
import React from 'react';
import PaymentMethods from './component/PaymentMethods';
import iCommon from '../../Deposit/common';

let Deposit = (props) => {
	return (
		<div>
			<h1>{iCommon('hDeposit')}</h1>
			<p>{iCommon('dWelcome')} {window.username}</p>
			<p dangerouslySetInnerHTML={{__html: iCommon('dWelcomeDescription')}}/>

			<PaymentMethods paymentMethods={props.paymentMethods} />
		</div>
	)
};

Deposit.propTypes = {
	paymentMethods: React.PropTypes.array
};

export default Deposit;