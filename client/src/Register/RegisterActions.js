import 'whatwg-fetch';

import {
	REGISTER_IN_PROGRESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from './RegisterConstants';
import withUTMParams from '../utils/withUTMParams';

/* eslint no-use-before-define: 0 */

export function registerSubmit(email, confirmEmail, firstName, lastName, password) {
	return function(dispatch) {
		dispatch({ type: REGISTER_IN_PROGRESS });
		const data = `email=${window.encodeURIComponent(email)}&email_confirmation=${window.encodeURIComponent(confirmEmail)}&first_name=${window.encodeURIComponent(firstName)}&last_name=${window.encodeURIComponent(lastName)}&password=${window.encodeURIComponent(password)}`;
		return fetch(withUTMParams(`${Config.auth_server.host}/api/v2/register`), { // eslint-disable-line no-undef
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data),
			},
			credentials: 'include',
		}).then((res) => {
			if (res.status >= 400) {
				res.json().then((json) => {
					dispatch({
						type: REGISTER_FAIL,
						data: json,
					});
				});
				return false;
			}
			dispatch({
				type: REGISTER_SUCCESS,
			});
			return true;
		}).catch((err) => {
			dispatch({
				type: REGISTER_FAIL,
				data: err,
			});
			return false;
		});
	};
}
