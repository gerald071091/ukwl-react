/**
 * Created by isabella.inosantos on 5/3/2017.
 */

import iCommon from 'nls/common.js';

class Enums {
	FooterNavOne() {
		let footNav = [
			{
				text: iCommon('fAboutUs'),
				link: `/${window.cultureCode}/aboutus`
			},
			{
				text: iCommon('fContactUs'),
				link: `/${window.cultureCode}/contactus`
			},
			{
				text: iCommon('fPromotions'),
				link: `/${window.cultureCode}/promotions`
			}
		];

		if (!window.authed) {
			footNav.unshift({
				text: iCommon('fOpenAccount'),
				link: `/${window.cultureCode}/register`
			})
		}

		return footNav;
	}

	FooterNavTwo() {
		return [
			{
				text: iCommon('fTerms'),
				link: `/${window.cultureCode}/terms`
			},
			{
				text: iCommon('fRules'),
				link: `/${window.cultureCode}/rules`
			},
			{
				text: iCommon('fPrivacyPolicy'),
				link: `/${window.cultureCode}/privacypolicy`
			},
			{
				text: iCommon('fCashout'),
				link: `/${window.cultureCode}/cashout`
			}
		];
	}

	FooterNavThree() {
		let footNav = [
			{
				text: iCommon('fTechnicalSupport'),
				link: `/${window.cultureCode}/technicalsupport`
			},
			{
				text: iCommon('fDepositAndWithdrawals'),
				link: `/${window.cultureCode}/depositandwithdrawal`
			},
			{
                text: iCommon('fResponsibleGambling'),
                link: `/${window.cultureCode}/responsiblegambling`
			},
			{
				text: iCommon('fRtp'),
				link: `/${window.cultureCode}/rtp`
			},
			{
				text: iCommon('fFaq'),
				link: `/${window.cultureCode}/faq`
			}
		];

		if (!window.authed) {
			footNav.unshift({
				text: iCommon('fLostPassword'),
				link: `/${window.cultureCode}/lostpassword`
			});
		}

		return footNav;
	}

	LicenseIcons() {
		return [
			{
				link: "http://www.gamcare.org.uk/",
				src: "Content/images/footer/gamecare2.png",
				width: "50px"
			},
			{
				link: "",
				src: "Content/images/footer/RGTdonor1516.png",
				width: "50px"
			},
			{
				link: "",
				src: "Content/images/footer/18-plus2.png",
				width: "50px"
			},
			{
				link: "/en-gb/info/SafeandSecure",
				src: "Content/images/footer/secure.png",
				width: ""
			},
			{
				link: "https://www.gov.im/gambling/",
				src: "Content/images/footer/iom-crest.png",
				width: "50px"
			},
			{
				link: "https://secure.gamblingcommission.gov.uk/gccustomweb/PublicRegister/PRSearch.aspx?ExternalAccountId=38898",
				src: "Content/images/footer/gclogotransbg_small.png",
				width: "150px"
			},
			{
				link: "http://www.ibas-uk.com/",
				src: "Content/images/footer/ibas_logo_trans2.png",
				width: "150px"
			},
			{
				link: "http://www.gambleaware.co.uk/",
				src: "Content/images/footer/GA_logo_positive_RGB2.png",
				width: "200px"
			}
		];
	}
}

export default new Enums();