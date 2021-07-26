import 'whatwg-fetch';

import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_IN_PROGRESS,
	DISMISS_LOGIN_FAIL,
	TOO_MANY_FAILED_LOGINS
} from './LoginConstants';
import withUTMParams from '../utils/withUTMParams';

export const logIn = (email, password) => (dispatch) => {
	dispatch({ type: LOGIN_IN_PROGRESS });
	const data = `email=${window.encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
	return fetch(withUTMParams(`${Config.auth_server.host}/api/v2/login`), { // eslint-disable-line no-undef
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data),
		},
		credentials: 'include',
	}).then((res) => {
		if (res.status === 429) {
			return res.json()
				.then((json) => {
					dispatch({ type: TOO_MANY_FAILED_LOGINS, data: json });
				});
		}

		if (res.status >= 400) {
			return res.json()
				.then((json) => {
					dispatch({
						type: LOGIN_FAIL,
						data: json,
					});
				});
		}
		return dispatch({ type: LOGIN_SUCCESS });
	}).catch((err) => {
		dispatch({
			type: LOGIN_FAIL,
			data: err,
		});
	});
};

export const dismissLogInFail = () => ({ type: DISMISS_LOGIN_FAIL });
