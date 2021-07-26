import 'url-search-params-polyfill';
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_IN_PROGRESS,
	DISMISS_LOGIN_FAIL,
	TOO_MANY_FAILED_LOGINS
} from './LoginConstants';
import { redirectAuthenticatedRequest } from '../utils/redirectAuthenticatedRequest';

const initialState = {
	error: '',
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS: {
			redirectAuthenticatedRequest();

			return Object.assign({}, state, {
				loading: false,
				error: initialState.error,
			});
		}
		case LOGIN_FAIL: {
			const { errors } = action.data;
			let error = 'subscribe_error';
			errors.forEach((err) => {
				switch (err.code) {
					case '10110':
					case '10050':
						error = 'login_error';
						break;
					default:
						error = 'subscribe_error';
				}
			});
			return Object.assign({}, state, {
				loading: false,
				error,
			});
		}
		case TOO_MANY_FAILED_LOGINS: {
			return Object.assign({}, state, {
				error: 'too_many_failed_logins',
				loading: false,
			});
		}
		case DISMISS_LOGIN_FAIL: {
			return Object.assign({}, state, {
				error: initialState.error,
			});
		}
		case LOGIN_IN_PROGRESS: {
			return Object.assign({}, state, { loading: true });
		}
		default: return state;
	}
};
