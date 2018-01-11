/**
 * Created by isabella.inosantos on 5/8/2017.
 */

let sidebarInfo = [

		{
			text: "About Us",
			link: `/${window.cultureCode}/aboutus`
		},
		{
			text: "Contact Us",
			link: `/${window.cultureCode}/contactus`
		},
		{
			text: "Terms and Conditions",
			link: `/${window.cultureCode}/terms`
		},
		{
			text: "Rules",
			link: `/${window.cultureCode}/rules`
		},
		{
			text: "Privacy Policy",
			link: `/${window.cultureCode}/privacypolicy`
		},
		{
			text: "Cash Out",
			link: `/${window.cultureCode}/cashout`
		}
	],

	sidebarHelp = [
		{
			text: "Technical Support",
			link: `/${window.cultureCode}/technicalsupport`
		},
		{
			text: "Deposits & Withdrawals",
			link: `/${window.cultureCode}/depositandwithdrawal`
		},
		{
			text: "Responsible Gambling",
			link: `/${window.cultureCode}/responsiblegambling`
		},
		{
			text: "RTPs",
			link: `/${window.cultureCode}/rtp`
		},
		{
			text: "FAQs",
			link: `/${window.cultureCode}/faq`
		}
	],

    sidebarAccount = [
        {
            text: "my account",
            link: `/${window.cultureCode}/lostpassword`
        },
        {
            text: "Technical Support",
            link: `/${window.cultureCode}/technicalsupport`
        },
        {
            text: "Deposits & Withdrawals",
            link: `/${window.cultureCode}/depositandwithdrawal`
        },
        {
            text: "Responsible Gaming",
            link: `/${window.cultureCode}/responsiblegaming`
        },
        {
            text: "RTPs",
            link: `/${window.cultureCode}/rtp`
        },
        {
            text: "FAQs",
            link: `/${window.cultureCode}/faq`
        }
    ];

if (!window.authed) {
	sidebarInfo.unshift({
		text: "Open Account",
		link: `/${window.cultureCode}/register`
	});

	sidebarHelp.unshift({
		text: "Lost Password",
		link: `/${window.cultureCode}/lostpassword`
	});
}

let sidebarSettings = [
        {
            text: "My Account",
            subMenu:
            [
                {
                    text: "My Wallet",
                    link: `/${window.cultureCode}/mywallet`
                },
                {
                    text: "My Bonuses",
                    link: `/${window.cultureCode}/mybonuses`
                }
            ]
        },
        {
            text: "Account Activity",
            subMenu:
                [
                    {
                        text: "Game History",
                        link: `/${window.cultureCode}/gamehistory`
                    },
                    {
                        text: "Bonus History",
                        link: `/${window.cultureCode}/bonushistory`
                    }
                ]
        },
        {
            text: "Payments",
            subMenu:
                [
                    {
                        text: "Deposit",
                        link: `/${window.cultureCode}/deposit`
                    },
                    {
                        text: "Withdraw",
                        link: `/${window.cultureCode}/withdrawal`
                    },
                    {
                        text: "Transaction History",
                        link: `/${window.cultureCode}/transactionhistory`
                    }
                ]
        },
        {
            text: "Settings",
            subMenu:
                [
                    {
                        text: "My Details",
                        link: `/${window.cultureCode}/mydetails`
                    },
                    {
                        text: "Responsible Gaming ",
                        link: `/${window.cultureCode}/responsiblegaming`
                    }
                ]
        }
];

export default {sidebarInfo, sidebarHelp, sidebarSettings, sidebarAccount};
