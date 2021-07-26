import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const LocaleRedirect = (props) => {
	const { defaultLocale, locales, location } = props;
	const { hash, pathname, search } = location;
	const { navigator: { languages } } = window;
	let matchedLocale = '';
	for (const lang of languages) {
		if (locales.includes(lang)) {
			matchedLocale = lang;
			break;
		}
	}
	return <Redirect to={`/${matchedLocale || defaultLocale}${pathname}${hash}${search}`} />;
};

LocaleRedirect.propTypes = {
	defaultLocale: PropTypes.string,
	locales: PropTypes.arrayOf(PropTypes.string).isRequired,
};

LocaleRedirect.defaultProps = {
	defaultLocale: 'en',
};

export default withRouter(LocaleRedirect);
