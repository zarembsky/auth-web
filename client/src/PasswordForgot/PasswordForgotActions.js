import 'whatwg-fetch';

import {
	PASSWORD_FORGOT_SUCCESS,
	PASSWORD_FORGOT_NOT_FOUND,
	PASSWORD_FORGOT_FAIL,
	PASSWORD_FORGOT_TOO_MANY_ATTEMPTS
} from './PasswordForgotConstants';
import withUTMParams from '../utils/withUTMParams';

export function resetPassword(email) {
	return function(dispatch) {
		const data = `email=${window.encodeURIComponent(email)}`;
		fetch(withUTMParams(`${Config.auth_server.host}/api/v2/send_email/reset_password`), { // eslint-disable-line no-undef
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data),
			},
		})
			.then((res) => {
				switch (true) {
					case (res.status === 404):
						dispatch({
							type: PASSWORD_FORGOT_NOT_FOUND,
						});
						break;
					case (res.status === 429):
						dispatch({
							type: PASSWORD_FORGOT_TOO_MANY_ATTEMPTS
						});
						break;
					case (res.status >= 400):
						dispatch({
							type: PASSWORD_FORGOT_FAIL,
						});
						break;
					default:
						dispatch({
							type: PASSWORD_FORGOT_SUCCESS,
						});
				}
			})
			.catch(() => {
				dispatch({
					type: PASSWORD_FORGOT_FAIL,
				});
			});
	};
}
