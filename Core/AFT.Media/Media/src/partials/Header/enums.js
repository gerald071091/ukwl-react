/**
 * Created by bernard.molina on 5/2/2017.
 */

import iCommon from 'nls/common';

class Enums {
	HeaderTopNav() {
		return [
			{
				text:iCommon('hPromotions'),
				link:`/${window.cultureCode}/promotions`,
				border: true
			},
			{
				text: iCommon('hHelp'),
				link: `/${window.cultureCode}/help`,
				border: true
			},
			{
				text: iCommon('hAffiliates'),
				link: `/${window.cultureCode}/affiliates`,
				border: true
			},
			{
				text: iCommon('hForgotPW'),
				link: `/${window.cultureCode}/lostpassword`,
				border: false
			}
		];
}

	HeaderTabs() {
		return [
			{
				text: iCommon('hSports'),
				link: `/${window.cultureCode}/sportsbook`
			},
			{
				text: iCommon('hCasino'),
				link: `/${window.cultureCode}/casino`
			}
		];
	}

	HeaderAccount(){
		return [
			{
				text:iCommon('hDeposit'),
				link: `/${window.cultureCode}/Deposit`,
				onClick: false
			},

			{
				text:iCommon('hMyAccount'),
				link: `/${window.cultureCode}/myWallet`,
				onClick: false
			},

			{
				text:iCommon('hLogOut'),
				link:`/${window.cultureCode}`,
				onClick: true
			},
		]
	}
}

export default new Enums();