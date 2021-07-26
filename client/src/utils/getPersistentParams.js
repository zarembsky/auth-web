import QueryString from 'query-string';

const persistentParams = [
	'utm_campaign',
	'utm_source',
	'utm_medium',
	'utm_content',
	'utm_term',
	'redirect',
	'plan_id'
];

export const getPersistentParams = () => {
	const params = [];
	const parsedQS = QueryString.parse(window.location.search);
	persistentParams.forEach((name) => {
		const value = parsedQS[name];
		if (value) {
			params.push({ name, value: encodeURIComponent(value) });
		}
	});
	return params.map(ele => `${ele.name}=${ele.value}`).join('&');
};

export const withPersistentParams = (link, excludes = []) => {
	let paramsToInclude = persistentParams;
	if (excludes.length > 0) {
		paramsToInclude = paramsToInclude.filter(param => !excludes.includes(param));
	}

	try {
		const url = new URL(link);
		const parsedQS = QueryString.parse(window.location.search);
		Object.keys(parsedQS)
			.filter(k => paramsToInclude.includes(k))
			.map(k => url.searchParams.set(k, parsedQS[k]));

		return url.toString();
	} catch (e) {
		return link;
	}
};
