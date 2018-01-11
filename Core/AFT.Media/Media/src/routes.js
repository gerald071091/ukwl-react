/**
 * Created by bernard.molina on 4/18/2017.
 */
import React from 'react';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory,
	Redirect,
	IndexRedirect
} from 'react-router';

import AuthenticatedContainer from 'comp/AuthenticatedContainer';
import ErrorPageHandler from 'comp/ErrorPageHandler';

import Layout from './layout/PlainLayout';
import SidebarLayout from './layout/SidebarLayout/';
import MobileLayout from './layout/MobileLayout/';

import Casino from './views/Casino';
import GameLauncher from './views/GameLauncher';
import MultiSlot from './views/GameLauncher/game/multislot/';
import Sportsbook from './views/Sportsbook';
import Home from './views/Home';
import Register from './views/Register';
import RegisterComplete from './views/Register/Desktop/RegisterComplete';
import MRegister from './views/Register/Mobile';
import Promotions from './views/Promotions';
import AboutUs from './views/AboutUs';
import ContactUs from './views/ContactUs';
import TermsAndConditions from './views/Terms';
import Rules from './views/Rules';
import PrivacyPolicy from './views/PrivacyPolicy';
import CashOut from './views/CashOut';
import LostPassword from './views/LostPassword';
import TechnicalSupport from './views/TechnicalSupport';
import DepositAndWithdrawal from './views/DepositAndWithdrawal';
import ResponsibleGambling from './views/ResponsibleGambling';
import MyWallet from './views/MyWallet';
import MyBonuses from './views/MyBonuses';
import GameHistory from './views/GameHistory';
import BonusHistory from './views/BonusHistory';
import Deposit from './views/Deposit';
import MoneyBookers from './views/Deposit/Desktop/component/MoneyBookers';
import Neteller from './views/Deposit/Desktop/component/Neteller';
import Skrill from './views/Deposit/Desktop/component/Skrill';
import Withdrawal from './views/Withdrawal';
import TransactionHistory from './views/TransactionHistory';
import MyDetails from './views/MyDetails';
import ResponsibleGaming from './views/ResponsibleGaming';
import ResponsibleGamingComplete from './views/ResponsibleGamingComplete';
import RTP from './views/RTP';
import FAQ from './views/FAQ';

let routes = (
	<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
		<Route path="/">
			<IndexRedirect to={window.mainPage}/>
		</Route>

		<Route path={`/${window.cultureCode}`} component={Layout}>
			<IndexRoute component={Home} />
			<Route path="Sportsbook" component={Sportsbook} />
			<Route path="Casino" component={Casino} />
		</Route>

		{/*LOGGED IN PAGES*/}
		<Route component={AuthenticatedContainer}>
			<Route path={`/${window.cultureCode}`} component={SidebarLayout}>
				{/*Settings*/}
				<Route path="MyWallet" component={MyWallet} />
				<Route path="MyBonuses" component={MyBonuses} />
				<Route path="GameHistory" component={GameHistory} />
				<Route path="BonusHistory" component={BonusHistory} />
				<Route path="Deposit" component={Deposit} />
				<Route path="MoneyBookers/depositsuccess(/:tn)" component={MoneyBookers} />
				<Route path="DepositSuccess/skrillOnetap" component={MoneyBookers} skrillOnetap />
				<Route path="DepositSuccess/neteller" component={MoneyBookers} neteller />
				<Route path="Deposit/Neteller" component={Neteller} />
				<Route path="Deposit/Skrill" component={Skrill} />
				<Route path="Deposit/skrillOnetap" component={Skrill} skrillOnetap />
				<Route path="Withdrawal" component={Withdrawal} />
				<Route path="TransactionHistory" component={TransactionHistory} />
				<Route path="MyDetails" component={MyDetails} />
				<Route path="ResponsibleGaming" component={ResponsibleGaming} />
				<Route path="ResponsibleGamingComplete/:days/:type" component={ResponsibleGamingComplete} />

				<Redirect from='Account/MyWallet' to='MyWallet'/>
				<Redirect from='Account/MyBonuses' to='MyBonuses'/>
				<Redirect from='AccountActivity/GameHistory' to='GameHistory'/>
				<Redirect from='AccountActivity/BonusHistory' to='BonusHistory'/>
				<Redirect from='Payment/Deposit' to='Deposit'/>
				<Redirect from='Payment/Withdrawal' to='Withdrawal'/>
				<Redirect from='Payment/TransactionHistory' to='ResponsibleGaming'/>
				<Redirect from='Settings/MyDetails' to='ResponsibleGaming'/>
				<Redirect from='Settings/ResponsibleGaming' to='ResponsibleGaming'/>
				<Redirect from='Settings/ResponsibleGamingComplete' to='ResponsibleGamingComplete'/>
			</Route>
		</Route>

		{/*LOGGED OUT PAGES*/}
		<Route path={`/${window.cultureCode}`} component={SidebarLayout}>
			<Route path="Register/:hp" component={Register}>
				{window.authed && <IndexRedirect to={`/${window.cultureCode}`} />}
			</Route>
			<Route path="Register" component={Register}>
				{window.authed && <IndexRedirect to={`/${window.cultureCode}`} />}
			</Route>
			<Route path="RegisterComplete" component={RegisterComplete} />

            {/*INFO*/}
			<Route path="AboutUs" component={AboutUs} />
			<Route path="ContactUs" component={ContactUs} />
			<Route path="Terms" component={TermsAndConditions} />
			<Route path="Rules" component={Rules} />
			<Route path="PrivacyPolicy" component={PrivacyPolicy} />
			<Route path="CashOut" component={CashOut} />

			<Redirect from='Info/ContactUs' to='ContactUs'/>
			<Redirect from='Info/Terms' to='Terms'/>
			<Redirect from='Info/Rules' to='Rules'/>
			<Redirect from='Info/PrivacyPolicy' to='PrivacyPolicy'/>
			<Redirect from='Info/CashOut' to='CashOut'/>

			{/*HELP*/}
			<Route path="LostPassword" component={LostPassword} >
				{window.authed && <IndexRedirect to={`/${window.cultureCode}`} />}
			</Route>
			<Route path="TechnicalSupport" component={TechnicalSupport} />
			<Route path="DepositAndWithdrawal" component={DepositAndWithdrawal} />
			<Route path="ResponsibleGambling" component={ResponsibleGambling} />
			<Route path="RTP" component={RTP} />
			<Route path="FAQ" component={FAQ} />

			<Redirect from='Help/LostPassword' to='LostPassword'/>
			<Redirect from='Help/TechnicalSupport' to='TechnicalSupport'/>
			<Redirect from='Help/DepositAndWithdrawal' to='DepositAndWithdrawal'/>
			<Redirect from='Help/ResponsibleGambling' to='ResponsibleGambling'/>
			<Redirect from='Help/RTP' to='RTP'/>
			<Redirect from='Help/FAQ' to='FAQ'/>

			<Route path="Promotions" component={Promotions} />
			<Route path="Promotions/:promotionId" component={Promotions} />
		</Route>

		<Route path={`/${window.cultureCode}/mobile`} component={MobileLayout}>
			<Route path="Register" component={MRegister} />
		</Route>

		<Route path={`/${window.cultureCode}/GameLauncher`} component={GameLauncher}/>
		<Route path={`/${window.cultureCode}/GameLauncher/game/multislot`} component={MultiSlot}/>

		<Route path='*' component={ErrorPageHandler} />
	</Router>
);


export default routes;

