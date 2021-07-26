import { withPersistentParams } from './getPersistentParams';

const allowedRedirectSLDs = [
	'ghostery.com',
	'ghosterystage.com',
	'ghosterysearch.com',
	'ghosterybrowser.com',
	...(DEVELOPMENT // eslint-disable-line no-undef
		? ['localhost']
		: []
	)
];

export const redirectAuthenticatedRequest = (defaultRedirect = true) => {
	try {
		const params = new URLSearchParams(window.location.search);
		const redirect = decodeURIComponent(params.get('redirect'));
		const uri = new URL(redirect);

		// ensure https
		if (!DEVELOPMENT && uri.protocol !== 'https:') { // eslint-disable-line no-undef
			throw new Error('insecure redirect uri');
		}

		// allow subdomains
		let sld = uri.hostname;
		const domainParts = uri.hostname.split('.').reverse();
		if (domainParts.length > 2) {
			sld = `${domainParts[1]}.${domainParts[0]}`;
		}

		if (!allowedRedirectSLDs.includes(sld)) {
			throw new Error('unacceptable redirect uri');
		}

		// redirect
		window.location.href = withPersistentParams(uri.toString(), ['redirect']);
	} catch (e) {
		if (defaultRedirect) {
			window.location.href = withPersistentParams(Config.account_web_server.host, ['redirect']); // eslint-disable-line no-undef
		}
		// default to account redirection
	}
};
