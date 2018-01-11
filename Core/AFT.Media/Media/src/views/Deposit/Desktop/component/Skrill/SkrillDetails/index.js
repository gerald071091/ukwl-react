/**
 * Created by bernard.molina on 6/14/2017.
 */
import React from 'react';
import DepositLimit from 'comp/DepositLimit';
import iCommon from '../../../../common';
import {Link} from 'react-router';
import Input from 'comp/Input';
import styles from '../skrill.scss';

let SkrillDetails = (props) => {
	let detailTitle = props.isOneTap ? iCommon('skrillOnetapDetails') : iCommon('skrillDetails');

	return (
		<div className={styles.skrillDetails}>
			<h3>{detailTitle}</h3>
			<div className={styles.methodHolder}>
				<div dangerouslySetInnerHTML={{ __html: iCommon('skrillText') }}/>

				<div className={styles.depositLimit}>
					<DepositLimit transactionMethod='skrill'/>
				</div>

				<div className={styles.checkboxHolder}>
					<Input
						className={styles.checkbox}
						type="checkbox"
						defaultChecked={props.isChecked}
						onClick={props.onClick}/>
					<p className={styles.terms} dangerouslySetInnerHTML={{ __html: iCommon('haveReadTerms') }}/>
				</div>

				<div dangerouslySetInnerHTML={{ __html: iCommon('cAccordance') }}/>

				<form className={styles.depButton}>
					<Link className={styles.backBtn} to={`/${window.cultureCode}/Deposit`}>
						{iCommon('cBack')}
					</Link>
					<button
						type="submit"
						className={styles.depositBtn}
						onClick={props.submit}>
							{iCommon('hDeposit')} </button>
				</form>
			</div>
		</div>
	)
};

SkrillDetails.propTypes = {
	isChecked: React.PropTypes.bool,
	submit: React.PropTypes.func,
	onClick: React.PropTypes.func,
	isOneTap: React.PropTypes.bool

};

export default SkrillDetails;