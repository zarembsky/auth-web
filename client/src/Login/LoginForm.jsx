import React from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withTranslation } from 'react-i18next';

import emailRegex from '../utils/emailRegex';

const LoginForm = ({ loading, logIn, t }) => {
	const { errors: formErrors, handleSubmit, register } = useForm();

	const onSubmit = ({ email, password }, e) => {
		e.preventDefault();
		logIn(email, password);
	};

	return (
		<form id="login-form" onSubmit={handleSubmit(onSubmit)}>
			<FormGroup validationState={formErrors.email && 'error' || null}>
				<ControlLabel>
					{t('email_address')}
				</ControlLabel>
				<FormControl
					inputRef={register({
						pattern: emailRegex,
						required: true,
					})}
					name="email"
					type="email"
				/>
				{formErrors.email && (
					<HelpBlock>
						{t('please_enter_a_valid_email_address')}
					</HelpBlock>
				)}
			</FormGroup>
			<FormGroup validationState={formErrors.password && 'error' || null}>
				<ControlLabel>
					{t('password')}
				</ControlLabel>
				<FormControl
					inputRef={register({
						required: true,
					})}
					name="password"
					type="password"
				/>
				{formErrors.password && (
					<HelpBlock>
						{t('password_is_required')}
					</HelpBlock>
				)}
			</FormGroup>
			<FormGroup className="text-center">
				<Button
					type="submit"
					className="ghostery-blue"
					disabled={loading}
				>
					<span className={`${loading && 'hide'}`}>
						{t('sign_in')}
					</span>
					<span className={`${!loading && 'hide'} glyphicon glyphicon-refresh spinning`} />
				</Button>
			</FormGroup>
		</form>
	);
};

export default withTranslation()(LoginForm);
