/**
 * Created by gian.jamisola on 5/30/2017.
 */

import { root } from 'nls/common.js';

let localCommon = {
	//Responsible Gaming & RG Complete
	rgDescription: `<p>{0} is promoting Responsible Gambling and it is our mission to deliver fair play to
      every customer. We ensure that every customer is provided with the proper information as we prevent
      and treat whatever gambling concerns they may have.</p><p>{0} wants you to enjoy your gaming experience and knowing the right option is great practice for becoming a Responsible Gambler.<p>`,
	rgHeaderTitle: "Responsible Gaming {0}",
	rgDepositLimit: "Deposit Limit",
	rgRealityCheck: "Reality Check",
	rgTimeOut: "Time Out",
	rgSelfExclude: "Self-Exclude",
	rgYes: "Yes",
	rgNo: "No",
	rgSave: "Save",
	rgCompulsiveGamblerDescription: "Is your gambling causing problems for you or others around you?",
	rgTOSEDescription: `Please speak to Customer Services for guidance before applying these settings if you are unsureof what this means or how else you can manage your gambling responsibly. Once you haveSelf-Excluded or Timed-Out here it will be applied immediately. You will not be able to play onthis site until the period you have selected has expired, even if you change your mind at a later date.`,
	rgTOSENoted: `For more information please visit our <a target="_blank" href="/en-gb/responsiblegambling">Responsible Gambling Page</a>.
                    <p>Our Customer Services Team will contact you once you submit your choice.</p>
                    <p>Note that once the Self Exclusion period has elapsed you will need to contact us to re-open your
                        account.  Your account will only be re-opened after a cooling off period of 24 hours. We
                        recommend that when applying limits to your accounts that you consider doing so for all of your
                        gambling accounts.</p>`,
	rgTimeOutModalMsg: `<p>Further to your time out request, we must remind you that TGP Europe operate multiple sites, if you wish to be excluded for a time out period in another of our sites, we ask that you log in and select the same option.</p>
                    <p>We will now ensure your time out selection is active on this site once you click the OK option.</p>`,
	rgSelfExcludeModalMsg: `<p>Thank you for your instruction, we just need you to complete one more step before we put
                        this in place for you.</p>
                    <p>TGP Europe operate multiple sites if you wish to be excluded for the same period of time
                        from using or opening an account on any other brand please indicate by checking the
                        appropriate boxes and furnishing us with your username if you have an existing account.</p>
                    <p>We will endeavour to have this in place within 72 hours.</p>
                    <p>If you choose to leave the boxes unchecked your accounts with any other brand will be
                        unaffected.</p>
                    <p>Note: this action does not prevent players from signing up on other TGP websites, please
                        contact Customer Services if you have any concerns.</p>`,
	rgRCDescription: "A Reality Check is to tell you how long you have been playing and will appear on screen at the selected time intervals you have selected during your gaming session. You will be required toacknowledge this before continuing to play. You may change your Reality Check settings at anytime by revisiting this page.",
	rgTOCompleteMsg: `<div>
                <p>Dear Sir/Ma’am,</p>
                <p>This is an acknowledgement of your {0} request.</p>
                <p> After selecting the time-out option on {1} your account is now locked out, it will automatically be released on {2}.</p>
                <p> Please contact customer services with any questions you may have regarding your time-out excluded account.</p>
                <p>Best regards,</p>
                <p>Customer Support</p>
            </div>`,
	rgSECompleteMsg: `<div>
                <p>Dear Sir/Ma’am,</p>
                <p>This is an acknowledgement of your {0} request, we can confirm that your account is now Excluded until the {1}.</p>
                <p>As part of our Responsible Gambling Policy, we would like to take this opportunity to recommend the following support services who have trained advisors on hand to offer support to persons with have gambling problems:</p>
                <p>Gamble Aware - <a href="http://www.gambleaware.co.uk/" target="_blank">www.gambleaware.co.uk</a></p>
                <p>GamCare - <a href="http://www.gamcare.org.uk/" target="_blank">www.gamcare.org.uk</a></p>
                <p>You could also see more information about our support mechanisms in the Responsible Gambling section of our website:</p>
                <p><a href="/en-gb/responsiblegambling" target="_blank">Responsible Gambling</a></p>
                <p>We wish you the best of luck with your future endeavours.</p>
                <p>Best regards,</p>
                <p>Customer Support</p>
            </div>`,

	rgDLDescription: `<div>
						<p>When lowering your deposit limit, your new limit will be active immediately. If you request this via our customer service team, it may take up to 24 hours.</p>
						<p>If you wish to increase your deposit limit, we are required by law to apply a cooling-off period of 24 hours before making the change. As such, you are required to revisit this page to re-confirm your instructions after 24 hours.</p>
						<p>As per our terms and conditions, once you have set a limit and it’s confirmed to you, the full deposit value will be available to you regardless of any previous deposits you have made.</p>
					</div>`
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;