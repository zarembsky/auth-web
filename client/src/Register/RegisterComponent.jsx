import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Grid, Row, Col, Button, FormGroup, Checkbox, HelpBlock, ControlLabel, FormControl
} from 'react-bootstrap';
import QueryString from 'query-string';
import { useForm } from 'react-hook-form';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Trans, withTranslation } from 'react-i18next';

import Alert from '../Alert';
import RegisterModal from './RegisterModal';
import { getPersistentParams } from '../utils/getPersistentParams';
import emailRegex from '../utils/emailRegex';
import passwordRegex from '../utils/passwordRegex';
import withUTMParams from '../utils/withUTMParams';

const Register = ({
	actions, alertMessage, alertStyle, loading, hideForm, match: { params: { locale } }, t,
}) => {
	const {
		errors: formErrors, handleSubmit, register, watch
	} = useForm();
	const { trackPageView, trackEvent } = useMatomo();
	const [showModal, setShowModal] = useState(false);
	const params = getPersistentParams();
	const signInLink = params ? `/${locale}?${params}` : `/${locale}`;

	const openProductPage = () => {
		trackEvent({ category: 'Account', action: 'Account Creation', name: 'Install Ghostery - Account Creation' });
		const parsedQS = QueryString.parse(window.location.search);
		const { utm_source, utm_campaign } = parsedQS;
		const queryStringStart = utm_source || utm_campaign ? '?' : '';
		window.location = `https://www.ghostery.com/products/${queryStringStart}` +
			`${utm_source ? `&utm_source=${window.encodeURIComponent(utm_source)}` : ''}` +
			`${utm_campaign ? `&utm_campaign=${window.encodeURIComponent(utm_campaign)}` : ''}`;
	};

	const onSubmit = ({
		email, confirmEmail, firstName, lastName, password
	}, e) => {
		e.preventDefault();
		actions.registerSubmit(email, confirmEmail, firstName, lastName, password)
			.then((success) => {
				if (success) {
					trackEvent({ category: 'Account', action: 'Account Creation', name: 'Account Creation Success' });
				}
			});
	};

	useEffect(() => {
		document.title = t('create_an_account');
		trackPageView({
			documentTitle: `${document.domain}: ${document.title && document.title || 'PAGE TITLE MISSING'}`,
		});
	}, []);

	return (
		<Grid>
			{alertMessage &&
				<Alert bsStyle={alertStyle} message={t(alertMessage, { email: watch('email') })} />
			}

			<RegisterModal showModal={showModal} handleCloseModal={() => setShowModal(false)} />

			{hideForm ? (
				<Row>
					<Col sm={12} md={8} lg={5} className="medium-centered text-center">
						<Button className="ghostery-blue" onClick={openProductPage}>
							<span>{t('install_product_name', { productName: 'Ghostery' })}</span>
						</Button>
					</Col>
				</Row>
			) : (
				<Row>
					<Col sm={12} md={8} lg={5} className="medium-centered">
						<h2 className="text-center">{t('create_an_account')}</h2>
						<p>
							{t('ghostery_account_benefits')}
							{' '}
							<a onClick={() => setShowModal(true)}>
								{t('learn_more')}
							</a>
						</p>
						<p>
							{t('account_exists')}
							{' '}
							<Link to={signInLink}>
								{t('sign_in_here')}
							</Link>
						</p>
						<form id="register-form" onSubmit={handleSubmit(onSubmit)}>
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
							<FormGroup validationState={formErrors.confirmEmail && 'error' || null}>
								<ControlLabel>
									{t('confirm_email_address')}
								</ControlLabel>
								<FormControl
									inputRef={register({
										validate: value => value === watch('email'),
										required: true,
									})}
									name="confirmEmail"
									type="email"
								/>
								{formErrors.confirmEmail && (
									<HelpBlock>
										{t('confirm_email_address_match_error')}
									</HelpBlock>
								)}
							</FormGroup>
							<FormGroup>
								<Row>
									<Col md={6}>
										<ControlLabel>
											{t('first_name')}
										</ControlLabel>
										<FormControl
											inputRef={register}
											name="firstName"
											type="text"
										/>
									</Col>
									<Col md={6}>
										<ControlLabel>
											{t('last_name')}
										</ControlLabel>
										<FormControl
											inputRef={register}
											name="lastName"
											type="text"
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup validationState={formErrors.password && 'error' || null}>
								<ControlLabel>
									{t('password')}
								</ControlLabel>
								<FormControl
									inputRef={register({
										pattern: passwordRegex,
										required: true,
									})}
									name="password"
									type="password"
								/>
								{formErrors.password && (
									<HelpBlock>
										{t('password_error', {
											symbols: '! @ # $ % ^ & * = + ( ) < > { } [ \\ ] ; : , . / ?',
											interpolation: { escapeValue: false }
										})}
									</HelpBlock>
								)}
							</FormGroup>
							<FormGroup validationState={formErrors.termsConsent && 'error' || null}>
								<Checkbox
									inputRef={register({
										required: true,
									})}
									name="termsConsent"
								>
									<Trans i18nKey="i_accept_the_terms_the_license_the_policy">
										I accept the
										<a href={withUTMParams('https://www.ghostery.com/about-ghostery/ghostery-terms-and-conditions/')} target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
										, the
										<a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank" rel="noopener noreferrer">Public License Agreement</a>
										, and consent to data practices found in the
										<a href={withUTMParams('https://www.ghostery.com/about-ghostery/ghostery-plans-and-products-privacy-policy/')} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
										.
									</Trans>
								</Checkbox>
							</FormGroup>
							<FormGroup className="text-center">
								<Button
									type="submit"
									className="ghostery-blue"
									disabled={loading}
								>
									<span className={`${loading && 'hide'}`}>
										{t('create_an_account')}
									</span>
									<span className={`${!loading && 'hide'} glyphicon glyphicon-refresh spinning`} />
								</Button>
							</FormGroup>
						</form>
					</Col>
				</Row>
			)}
		</Grid>
	);
};

export default withTranslation()(Register);
