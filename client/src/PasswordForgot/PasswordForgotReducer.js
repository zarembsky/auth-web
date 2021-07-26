import {
	PASSWORD_FORGOT_SUCCESS,
	PASSWORD_FORGOT_NOT_FOUND,
	PASSWORD_FORGOT_FAIL,
	PASSWORD_FORGOT_TOO_MANY_ATTEMPTS
} from './PasswordForgotConstants';

const initialState = {
	alertMessage: '',
	alertStyle: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PASSWORD_FORGOT_SUCCESS: {
			return Object.assign({}, state, {
				alertMessage: 'email_sent_to',
				alertStyle: 'success',
			});
		}
		case PASSWORD_FORGOT_NOT_FOUND: {
			return Object.assign({}, state, {
				alertMessage: 'email_not_found',
				alertStyle: 'danger',
			});
		}
		case PASSWORD_FORGOT_FAIL: {
			return Object.assign({}, state, {
				alertMessage: 'subscribe_error',
				alertStyle: 'danger',
			});
		}
		case PASSWORD_FORGOT_TOO_MANY_ATTEMPTS: {
			return Object.assign({}, state, {
				alertMessage: 'too_many_reset_password_attempts',
				alertStyle: 'danger',
			});
		}
		default: return state;
	}
};
