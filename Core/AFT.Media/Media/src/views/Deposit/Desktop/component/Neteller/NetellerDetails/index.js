/**
 * Created by bernard.molina on 6/19/2017.
 */
import React from 'react';
import {Link} from 'react-router';
import DepositLimit from 'comp/DepositLimit';
import Input from 'comp/Input';
import iCommon from '../../Neteller/common';
import styles from '../../Neteller/neteller.scss';

let NetellerDetails = (props) => {
		return (
			<div className={styles.netellerDetails}>
				<h3>{iCommon('netellerDetails')}</h3>
				<div className={styles.methodHolder}>
					<div className={`row ${styles.AccountHolder}`}>
						<p className="col-lg-3">{iCommon('accntId')}</p>
						<div className="col-lg-3">
							<Input type="text" id="acctId" onBlur={props.blurAcctID}/>
						</div>

						<div className="col-lg=5">
							<p className={`${styles.details}`}>
								{iCommon('netellerText')}</p>
						</div>
					</div>

					<div className={`row ${styles.AccountHolder}`}>
						<p className="col-lg-3">{iCommon('secureIdtext')}</p>
						<div className="col-lg-3">
							<Input type="text" id="securityId" onBlur={props.blurSecureID}/>
						</div>

						<div className="col-lg=5">
							<p className={`${styles.details}`}
								dangerouslySetInnerHTML={{ __html: iCommon('netelerSecureId') }}/>
						</div>

					</div>

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
}

NetellerDetails.propTypes = {
	isChecked: React.PropTypes.bool,
	submit: React.PropTypes.func,
	onClick: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	blurSecureID: React.PropTypes.func,
	blurAcctID: React.PropTypes.func
};



export default NetellerDetails;