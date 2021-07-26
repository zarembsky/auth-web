import {
	EMAIL_CODE_VERIFY_SUCCESS,
	EMAIL_CODE_VERIFY_FAIL
} from './VerifyEmailConstants';

const initialState = {
	alertText: '',
	alertStyle: '',
	showContinueButton: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case EMAIL_CODE_VERIFY_SUCCESS: {
			return Object.assign({}, state, {
				alertText: 'email_verified',
				alertStyle: 'success',
				showContinueButton: true,
			});
		}
		case EMAIL_CODE_VERIFY_FAIL: {
			return Object.assign({}, state, {
				alertText: (action.payload && action.payload.errorMessage) || 'account_validation_error',
				alertStyle: 'danger',
				showContinueButton: false,
			});
		}
		default: return state;
	}
};
