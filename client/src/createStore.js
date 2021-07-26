import {
	combineReducers,
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';

import { loginReducer } from './Login';
import { registerReducer } from './Register';
import { passwordForgotReducer } from './PasswordForgot';
import { verifyEmailReducer } from './VerifyEmail';

const reducer = combineReducers({
	login: loginReducer,
	register: registerReducer,
	passwordForgot: passwordForgotReducer,
	verifyEmail: verifyEmailReducer,
});

export default function() {
	return createStore(
		reducer,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		),
	);
}
