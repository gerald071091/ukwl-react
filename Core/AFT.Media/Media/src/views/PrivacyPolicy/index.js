/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import {Link} from 'react-router';
import styles from './ppolicy.scss';

class PrivacyPolicy extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getText('sidebarInfo', "Privacy Policy");
	}

	render() {
		return (
			<div className={styles.privacyPolicyPage}>
				<h2 className="mainTitle">Privacy Policy</h2>

				<p className={`pull-right ${styles.policyDate}`}> Updated : 4th January 2017 </p>
				<p className={styles.boldUnder}> This Privacy Policy explains how we receive, use and
					protect Your personal data.</p>

				<p> &ldquo;us&rdquo;, &ldquo;our&rdquo;, &ldquo;we&rdquo; means {window.registeredCompany} a company
					incorporated in the {window.registeredLocation} with Registered Number {window.registeredNumber}
					having its Registered Office at {window.registeredAddress} together with TGP Europe Limited. TGP
					Europe Limited are a company incorporated in the Isle of Man with Registered Number 122698C having
					its Registered Office at 2nd Floor Athol House, 21a – 23 Athol Street, Douglas, Isle of Man, IM1
					1LB. The services of TGP Europe and the activities of this website are licensed in the Isle of Man
					and the United Kingdom.</p>
				<p>“Bet” means any bet, wager or the like made by a Player in relation to the Services;</p>
				<p>“You” and “Your” means you, the player using the Website, Gaming Platform or the Services;</p>
				<p>"Gaming Platform" means any online and/or mobile platform provided by Us to allow You to access the
					Website and the Services;</p>
				<p>"Group" means TGP Europe Limited together with its subsidiaries and any holding company of TGP Europe
					Limited and any subsidiary of such holding company. </p>
				<p>“Website” means the Website <Link to="/en-gb">{window.siteUrl}</Link>;</p>
				<p>“Services” means the provision by Us of gaming and betting services provided via the Website and the
					Gaming Platform.</p>
				<p>Protecting Your privacy and Your personal data is important to Us.</p>
				<p>Your personal information data will be held in accordance with the Isle of Man Data Protection Act
					2002, as amended, varied or replaced from time to time (the “Data Protection Law”).</p>
				<h3 className="h3-application1">APPLICABILITY OF THIS PRIVACY POLICY</h3>
				<p>By using the Website, You agree to the terms of this Privacy Policy and the use and disclosure of
					Your personal data as set out in this Privacy Policy.</p>
				<p>We will review this Privacy Policy periodically, and reserve the right to modify and update this
					Privacy Policy at any time. Changes to this Privacy Policy will come into effect immediately upon
					such changes being notified on the Website by a prominent notice. Your continued use of this Website
					following such notification will constitute Your acceptance of these changes. Please review this
					Privacy Policy periodically and print off a copy for Your records.</p>
				<h3 className="h3-application2">PERSONAL DATA COLLECTED AND ITS USE</h3>
				<p>We collect personal data when You use the Website and information about the transactions You
					undertake including details of payment cards used. Where details of payment cards used are provided,
					they are stored in a fully encrypted format and not accessible by Us.</p>
				<p>You will be asked to provide personal data when You register for any account with Us or otherwise use
					the Website or the Services.</p>
				<p>When You use the Website and/or the Services, Our servers keep an activity log unique to You that
					collects certain administrative and traffic information including: source IP address, time of
					access, date of access, web page(s) visited, language use, software crash reports and type of
					browser used. Such details are essential for the provision of and the quality of the Website and the
					Services.</p>
				<p>We may collect personal data about You from third parties including financial institutions,
					identification verification agencies, credit providers and credit reference agencies for the
					purposes of maintaining Your account with Us (“Your Account”), identification verification,
					conducting credit or other financial checks, and You consent to Our collection and processing of
					Your personal data for these purposes.</p>
				<p className="p-legal2">Your personal data will be used by Us and by third parties on Our behalf:</p>
				<ul>
					<li>a. To set up, manage and administer Your Account, including for anti-money laundering,
						prevention of terrorist financing and identity verification; and
					</li>
					<li>b. To make, settle and pay Bets;</li>
					<li>c. For statistical and research purposes;</li>
					<li>d. For market research, marketing and data analysis purposes;</li>
					<li>e. To analyse Your credit risk (if applicable);</li>
					<li>f. To improve the quality or service and gaming experience for Our players;</li>
					<li>g. <strong>to detect and report fraud, cheating and money laundering; and</strong></li>
					<li>h. to comply with licensing and regulatory requirements as are applicable to Us.</li>
				</ul>
				<p>We and other members of Our Group may contact You to advise You of other goods and services that We
					think may be of interest to You. If You do not wish to receive such marketing materials, please
					email Our customer services team at <a href={`mailto:${window.supportEmail}`}>{window.supportEmail}</a> Any
					telephone calls You make to Us may be recorded for training and/or security purposes.</p>
				<h3 className="h3-application3">ACCURACY OF PERSONAL DATA</h3>

				<p>It is Your responsibility to notify Us of any changes in Your personal data by sending an email to
					Our customer services team</p>
				<p>If You believe any of Your personal data is incorrect or inaccurate, You may request corrections or
					changes to such personal data by emailing Our customer services team. We may require You to provide
					information to Us to allow Us to verify Your identity in this event.</p>
				<h3 className="h3-application3">SUBJECT ACCESS REQUESTS</h3>
				<p> Under Section 5 of the Isle of Man Data Protection Act 2002 you are entitled to a copy of the
					information that we hold on file for you (Subject Access Request).</p>
				<p> To make a Subject Access Request please send us an email detailing what information you wish to
					receive. This request must come from the email address you have registered with us. We will respond
					indicating the fee for processing this (up to £10), how to send us this fee and details of identity
					documents that we may need in order to verify your identity before acting upon your request. </p>
				<p> Once we have received the applicable fee and required documents we will send your information by
					registered post within 40 calendar days.</p>
				<h3 className="h3-application4">DISCLOSURES</h3>
				<p>We may disclose Your personal data:</p>
				<ul className="ul-required1">
					<li>a. If required to do so by law. This may include disclosing Your personal data to third parties
						for the purposes of identifying You, anti-money laundering and the prevention of terrorist
						financing. We may also obtain personal data about You from third parties to allow Us to carry
						out checks to prevent money laundering, vetting and identification and the prevention of the
						terrorist financing;
					</li>
					<li>
						b. If We believe in good faith that such action is necessary:
						<ul>
							<li>i. to comply with any law or comply with legal process served on Us;</li>
							<li>ii. to protect and defend Our rights or property; or</li>
							<li>iii. to act to protect the personal safety of users of the Website, the Services or the
								public;
							</li>
						</ul>
					</li>
					<li>c. to any regulatory body or licensing body or authority;</li>
					<li>d. to third parties for the purposes of settling or making payment in connection with any Bet;
					</li>
					<li>e. to any payment management company engaged by Us to handle payment and collection processes to
						and from Our players;
					</li>
					<li>f. to third parties who provide services to Us (including software) or on Our behalf;</li>
					<li>g. to any third party that purchases Us or Our business; or any part of Us or our business;</li>
					<li>h. with Your consent;</li>
					<li>i. for the purposes of disaster recovery; and</li>
					<li>k. to {window.siteName} under whose commercial branding this Website is advertised.</li>
				</ul>
				<p>Your personal information, together with device identifying information (for example your device’s IP
					address), may for the purposes described above, be transferred or disclosed to any company within
					Our Group or, subject to appropriate agreement</p>
				<p>Your personal data may be processed outside of the European Economic Area. In this event, We will
					ensure that Your personal data is processed in accordance with the Data Protection Law.</p>
				<h3 className="h3-application5">COOKIES</h3>
				<p>Cookies are small text files that are stored on a Player's computer or equipment when the Player
					visits certain online pages of the Website that record the Player's preferences. We use cookies to
					track player's use of the Website and the Services. We may also use cookies to monitor traffic to
					the Website and the Services, improve the Website and the Services and make it easier and/or more
					relevant for Players’ use, and to assist with the detection of fraud, to ensure that customers are
					genuine, have not registered more than once or are not fraudulently trying to access accounts that
					do not belong to them, or otherwise misuse the Website. This includes but is not limited to the
					collection of device and location information, You hereby accept use by Us of cookies on the Website
					and our disclosure of the collected data to third parties who provide services to Us (including
					software) or on Our behalf in order to monitor use of the Website for the aforementioned
					purposes.</p>
				<h3 className="h3-application5">SECURITY</h3>
				<p>We will take the steps as required by the Data Protection Law to ensure that the personal data We
					collect is accurately recorded and kept securely.</p>
				<p>We do not warrant the security of any information, including personal data, which You transmit to Us
					over the internet. However, once We receive Your personal data, We will protect Your personal data
					from misuse, loss or unauthorised access in accordance with the Data Protection Law.</p>
				<h3 className="h3-application5">INTERNET-BASED TRANSFERS</h3>
				<p>Given that the internet is a global environment, using the internet to collect and process personal
					data necessarily involves the transmission of personal data on an international basis. Therefore, by
					browsing this Website and communicating electronically with Us, You acknowledge and agree to Us
					processing Your personal data in this way.</p>
				<p>If You have any other queries regarding this Privacy Policy or Our practices regarding the processing
					of personal data please email our customer services team at <a
						href={`mailto:${window.supportEmail}`}>{window.supportEmail}</a></p>
			</div>
		);
	}
}

export default PrivacyPolicy;