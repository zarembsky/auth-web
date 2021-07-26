import { redirectAuthenticatedRequest } from '../utils/redirectAuthenticatedRequest';
import {
	REGISTER_IN_PROGRESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from './RegisterConstants';

/* eslint no-use-before-define: 0 */
const initialState = {
	alertMessage: '',
	alertStyle: '',
	loading: false,
	hideForm: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_IN_PROGRESS: {
			return Object.assign({}, state, { loading: true });
		}
		case REGISTER_SUCCESS: {
			redirectAuthenticatedRequest(false);
			return Object.assign({}, state, {
				loading: false,
				hideForm: true,
				alertMessage: 'account_created',
				alertStyle: 'success',
			});
		}
		case REGISTER_FAIL: {
			// TODO handle multiple errors
			const { errors } = action.data;
			return Object.assign({}, state, {
				loading: false,
				alertMessage: errors && (errors[0].detail || errors[0].title) || 'subscribe_error',
				alertStyle: 'danger',
			});
		}
		default: return state;
	}
};
