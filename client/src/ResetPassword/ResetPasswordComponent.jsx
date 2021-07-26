import 'whatwg-fetch';
import React, { useEffect, useState } from 'react';
import {
	Grid,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	Form,
	FormControl,
	HelpBlock,
	Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import Alert from '../Alert';
import passwordRegex from '../utils/passwordRegex';
import withUTMParams from '../utils/withUTMParams';

const ResetPassword = ({ match: { params: { code } }, t }) => {
	const {
		errors: formErrors, handleSubmit, register, watch
	} = useForm();
	const { trackPageView } = useMatomo();
	const [alertText, setAlertText] = useState('');
	const [alertStyle, setAlertStyle] = useState('info');
	const [loading, setLoading] = useState(false);

	const onSubmit = ({ newPassword, newPasswordConfirmation }, e) => {
		e.preventDefault();
		setLoading(true);
		const data =
			`&new_password=${encodeURIComponent(newPassword)}` +
			`&new_password_confirmation=${encodeURIComponent(newPasswordConfirmation)}` +
			`&reset_password_code=${encodeURIComponent(code)}`;
		fetch(withUTMParams(`${Config.auth_server.host}/api/v2/reset_password`), { // eslint-disable-line no-undef
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data),
			},
		}).then((res) => {
			if (res.status >= 400) {
				throw new Error(res.text());
			}
			setLoading(false);
			setAlertText(t('password_reset_success'));
			setAlertStyle('success');
		}).catch((errors) => {
			setLoading(false);
			setAlertText(errors.length > 0 && errors[0].title || t('password_reset_error'));
			setAlertStyle('danger');
		});
	};

	const handleAlertDismiss = () => {
		setAlertText('');
		setAlertStyle('info');
	};

	useEffect(() => {
		document.title = t('choose_new_password');
		trackPageView({
			documentTitle: `${document.domain}: ${document.title && document.title || 'PAGE TITLE MISSING'}`,
		});
	}, []);

	return (
		<Grid>
			{alertText &&
				<Alert bsStyle={alertStyle} onDismiss={handleAlertDismiss} message={alertText} />
			}
			<Row id="reset-password-container">
				<Col sm={12} md={8} lg={5} className="medium-centered">
					<h2 className="text-center">
						{t('choose_new_password')}
					</h2>
					<form id="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
						<Form componentClass="fieldset">
							<FormGroup validationState={formErrors.newPassword && 'error' || null}>
								<ControlLabel>
									{t('password')}
								</ControlLabel>
								<FormControl
									name="newPassword"
									inputRef={register({
										pattern: passwordRegex,
										required: true,
									})}
									type="password"
								/>
								{formErrors.newPassword && (
									<HelpBlock>
										{t('password_error', {
											symbols: '! @ # $ % ^ & * = + ( ) < > { } [ \\ ] ; : , . / ?',
											interpolation: { escapeValue: false }
										})}
									</HelpBlock>
								)}
							</FormGroup>
							<FormGroup validationState={formErrors.newPasswordConfirmation && 'error' || null}>
								<ControlLabel>
									{t('confirm_new_password')}
								</ControlLabel>
								<FormControl
									name="newPasswordConfirmation"
									inputRef={register({
										validate: value => value === watch('newPassword'),
										required: true,
									})}
									type="password"
								/>
								{formErrors.newPasswordConfirmation && (
									<HelpBlock>
										{t('password_match_error')}
									</HelpBlock>
								)}
							</FormGroup>
							<FormGroup className="text-center">
								<Button
									type="submit"
									className="ghostery-blue"
								>
									<span className={`${loading && 'hide'}`}>
										{t('save_password')}
									</span>
									<span className={`${!loading && 'hide'} glyphicon glyphicon-refresh spinning`} />
								</Button>
							</FormGroup>
						</Form>
					</form>
				</Col>
			</Row>
		</Grid>
	);
};

export default withTranslation()(ResetPassword);
