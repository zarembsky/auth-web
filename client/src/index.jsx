import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHRBackend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Cookies from 'js-cookie';
import { MatomoProvider, createInstance as createMatomoInstance } from '@datapunt/matomo-tracker-react';

import createStore from './createStore';
import Login from './Login';
import PasswordForgot from './PasswordForgot';
import Register from './Register';
import VerifyEmail from './VerifyEmail';
import ResetPassword from './ResetPassword';
import NotFound from './NotFound';
import LoadingModal from './LoadingModal';
import Header from './Header';
import Footer from './Footer';
import LocaleRedirect from './LocaleRedirect';
import Search from './Search';

const store = createStore();
const locales = ['de', 'en', 'es', 'fr', 'hu', 'it', 'ja', 'ko', 'nl', 'pl', 'pt-BR', 'ru', 'zh-CN', 'zh-TW'];
i18n
	.use(XHRBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		load: 'currentOnly',
		interpolation: {
			prefix: '%{',
			suffix: '}'
		},
		backend: {
			loadPath: '/locales/%{lng}.json',
		},
		detection: {
			order: ['path']
		}
	});

const consent = Cookies.get('g_consent');
const matomoInstance = createMatomoInstance({
	disabled: consent && consent.includes('v1=opt-out') || false,
	linkTracking: true,
	siteId: Config.matomo.site_id, // eslint-disable-line no-undef
	urlBase: 'https://analytics.ghostery.com',
	configurations: {
		setCookieDomain: `*.${Config.domain}`, // eslint-disable-line no-undef
		setDoNotTrack: true,
	},
	heartBeat: {
		active: true,
		seconds: 10,
	},
});

const Routes = () => (
	<Suspense fallback={<LoadingModal />}>
		<Header />
		<Switch>
			<Route exact path="/:locale/" component={Login} />
			<Route exact path="/:locale/password/forgot" component={PasswordForgot} />
			<Route exact path="/:locale/register" component={Register} />
			<Route exact path="/:locale/search" component={Search} />
			<Route exact path="/:locale/verify/validate_account/:code" component={VerifyEmail} />
			<Route exact path="/:locale/verify/reset_password/:code" component={ResetPassword} />
			<Route component={NotFound} />
		</Switch>
		<Footer />
	</Suspense>
);

ReactDOM.render(
	(
		<Provider store={store}>
			<MatomoProvider value={matomoInstance}>
				<Router history={createBrowserHistory()}>
					<Switch>
						<Route path={`/:locale(${locales.join('|')})`} component={Routes} />
						<Route render={() => <LocaleRedirect locales={locales} />} />
					</Switch>
				</Router>
			</MatomoProvider>
		</Provider>
	), document.getElementById('content'),
);
