import 'whatwg-fetch';

import {
	EMAIL_CODE_VERIFY_SUCCESS,
	EMAIL_CODE_VERIFY_FAIL
} from './VerifyEmailConstants';
import withUTMParams from '../utils/withUTMParams';

export function verifyEmailCode(code) {
	return dispatch => fetch(withUTMParams(`${Config.auth_server.host}/api/v2/verify/validate_account/${code}`)) // eslint-disable-line no-undef
		.then((res) => {
			if (!res.ok) {
				dispatch({
					type: EMAIL_CODE_VERIFY_FAIL,
					payload: {
						errorMessage: res.statusText,
					},
				});
				return;
			}
			dispatch({
				type: EMAIL_CODE_VERIFY_SUCCESS,
				payload: {
					successMessage: '',
				},
			});
		})
		.catch((err) => {
			dispatch({
				type: EMAIL_CODE_VERIFY_FAIL,
				payload: {
					errorMessage: err,
				},
			});
		});
}
