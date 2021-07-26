import QueryString from 'query-string';

const utms = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];

/**
 * Adds any utm paremeters from the current window location, if available, to the given
 * link. If the link is not a valid URL, this function will simply return the
 * supplied link string.
 *
 * @param {string} link The link string to add utm params to.
 * @returns {string} A URL string with appended utm params or original link string.
 * */
const withUTMParams = (link) => {
	try {
		const url = new URL(link);
		const parsedQS = QueryString.parse(window.location.search);
		Object.keys(parsedQS)
			.filter(k => utms.includes(k))
			.map(k => url.searchParams.set(k, parsedQS[k]));

		return url.toString();
	} catch (e) {
		return link;
	}
};

export default withUTMParams;
