import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Grid, Row, Col, FormGroup, ControlLabel, Form, FormControl, HelpBlock, Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { getPersistentParams } from '../utils/getPersistentParams';
import Alert from '../Alert';

const PasswordForgot = ({
	actions, alertMessage, alertStyle, match: { params: { locale } }, t
}) => {
	const {
		errors: formErrors, handleSubmit, register, watch
	} = useForm();
	const { trackPageView } = useMatomo();
	const params = getPersistentParams();
	const signInLink = params ? `/${locale}?${params}` : `/${locale}`;

	const onSubmit = ({ email }, e) => {
		e.preventDefault();
		actions.resetPassword(email);
	};

	useEffect(() => {
		document.title = t('forgot_password');
		trackPageView({
			documentTitle: `${document.domain}: ${document.title && document.title || 'PAGE TITLE MISSING'}`,
		});
	}, []);

	return (
		<Grid>
			{alertMessage &&
				<Alert bsStyle={alertStyle} message={t(alertMessage, { email: watch('email') })} />
			}
			<Row id="password-reset-container">
				<Col sm={12} md={8} lg={5} className="medium-centered">
					<h2 className="text-center">
						{t('forgot_password')}
					</h2>
					<p>
						{t('password_reset_message')}
					</p>
					<form id="password-reset-form" onSubmit={handleSubmit(onSubmit)}>
						<Form componentClass="fieldset">
							<FormGroup validationState={formErrors.email && 'error' || null}>
								<ControlLabel>
									{t('email_address')}
								</ControlLabel>
								<FormControl
									inputRef={register({
										pattern: /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, // eslint-disable-line no-control-regex
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
							<FormGroup className="text-center">
								<Button bsStyle="link">
									<Link to={signInLink}>
										{t('cancel')}
									</Link>
								</Button>
								<Button
									type="submit"
									className="ghostery-blue"
								>
									{t('submit')}
								</Button>
							</FormGroup>
						</Form>
					</form>
				</Col>
			</Row>
		</Grid>
	);
};

export default PasswordForgot;
