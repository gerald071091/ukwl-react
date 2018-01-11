/**
 * Created by bernard.molina on 5/31/2017.
 */
import React from 'react';
import Input from 'comp/Input'
import enums from './enums';

import styles from './paymentTemplate.scss';

let PaymentTemplate = (props) => {
	const PAYMENTNAME = props.data.toLowerCase();
	const DETAILS = enums[PAYMENTNAME];
	const ONETAP = enums.skrillOneTap;

	let radioContent = props.radioButton ?
		<Input className={`col-xs-2`}
			onClick={() => { props.onClick(PAYMENTNAME)}}
			type={props.type || 'radio'}
			name="payment" /> : '',
		paymentContent = '',

		radioOneTap = props.radioButton ? <Input className={`col-xs-2`}
						onClick={() => { props.onClick('skrillOnetap')}}
						type={props.type || 'radio'}
						name="payment" /> : '',

		skrillOneTapContent = '';

		if(props.showOnetap){
			skrillOneTapContent =
			<div>
				<div className={styles.imageHolder}>
					<img
						className={styles.oneTap}
						src={window.cmsMedia(`Content/images/depositWithdrawal/${ONETAP.img}`)} />
				</div>

				<div className={styles.details}>
					<p>{ONETAP.title}</p>
					<p>{ONETAP.desc}</p>
				</div>
			</div>
		}



	if(PAYMENTNAME === 'skrill'){
			paymentContent = <div>
				{radioContent}
				<div className={styles.imageHolder}>
					<img src={window.cmsMedia(`Content/images/depositWithdrawal/${DETAILS.img}`)} />
				</div>

				<div className={styles.details}>
					<p>{DETAILS.title}</p>
					<p>{DETAILS.desc}</p>
				</div>

				{radioOneTap}
				{skrillOneTapContent}
			</div>
		}else{
			paymentContent = <div>
				{radioContent}
				<div className={styles.imageHolder}>
					<img src={window.cmsMedia(`Content/images/depositWithdrawal/${DETAILS.img}`)} />
				</div>
				<div className={styles.details}>
					<p>{DETAILS.title}</p>
					<p>{DETAILS.desc}</p>
				</div>
			</div>
		}

	return (
		<div className={styles.payment}>
			{paymentContent}
		</div>
	)
};

PaymentTemplate.propTypes = {
	type: React.PropTypes.string,
	data: React.PropTypes.string,
	radioButton: React.PropTypes.bool,
	onClick: React.PropTypes.func,
	showOnetap: React.PropTypes.bool
};

export default PaymentTemplate;