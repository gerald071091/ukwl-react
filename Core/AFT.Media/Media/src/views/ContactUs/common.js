/**
 * Created by gian.jamisola on 5/30/2017.
 */

import {root} from 'nls/common.js';

let localCommon = {
    headerTitle: "Contact Us",
    description: `<p>By Live Chat: Click <a href="javascript:void(showLiveChat())">here</a> </p>
				<p>By Email Customer Service enquiries: <a href=${`mailto:${window.supportEmail}`}>${window.supportEmail}</a></p>
				<p>Send your documents to: <a href=${window.docsEmail}>${window.docsEmail}</a></p>
				<p>By Post: ${`${window.siteName} ${window.registeredAddress}`}</p>
				<p>If you have any customer support queries please use the form below or email us at <a href=${`mailto:${window.supportEmail}`}>${window.supportEmail}</a></p>

				<h2>COMPLAINTS</h2>

				<p>If you are unhappy with any part of our service and have decided to lodge a complaint, we will try to resolve your case via our escalation procedure. In the event that a satisfactory resolution is not reached, you can lodge your complaint with the Authority detailed below:</p>

				<p>
					<strong>If you are a UK resident:</strong><br />
					UK Licensed gambling operators are required to offer dispute resolution by an independent third party or ‘alternate dispute resolution’ (ADR) provider in line with LCCP social responsibility (SR) code 6.1.1.<br />
					We have appointed the Independent Betting Adjudication Services (IBAS) as our ADR.<br />
					Please direct unresolved complaints to them at telephone number +44 207 347 5883.<br />
					Further details about IBAS can be found at <a href="http://www.ibas-uk.com/" target="_blank">http://www.ibas-uk.com/</a>
				</p>

				<p>
					<strong>If you are not a UK resident:</strong><br />
					Please direct your complaint to the Isle of Man Gambling Supervision Commission.<br />
					Further details can be found at <a href="http://www.gov.im/gambling/ " target="_blank">http://www.gov.im/gambling/</a>
				</p>`
}

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;