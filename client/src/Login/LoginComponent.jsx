import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import Alert from '../Alert';
import LoginForm from './LoginForm';
import { getPersistentParams } from '../utils/getPersistentParams';

const Login = ({
	actions, error, loading, match: { params: { locale } }, t
}) => {
	const { trackPageView } = useMatomo();
	const handleAlertDismiss = () => {
		actions.dismissLogInFail();
	};
	const params = getPersistentParams();
	const forgotLink = params ? `/${locale}/password/forgot?${params}` : `/${locale}/password/forgot`;
	const registerLink = params ? `/${locale}/register?${params}` : `/${locale}/register`;

	useEffect(() => {
		document.title = t('sign_in');
		trackPageView({
			documentTitle: `${document.domain}: ${document.title && document.title || 'PAGE TITLE MISSING'}`,
		});
	}, []);

	return (
		<Grid>
			{error &&
				<Alert bsStyle="danger" message={t(error)} onDismiss={handleAlertDismiss} />
			}
			<Row id="login-container">
				<Col sm={12} md={8} lg={5} className="medium-centered">
					<h2 className="text-center">
						{t('sign_in')}
					</h2>
					<LoginForm loading={loading} logIn={actions.logIn} />
				</Col>
			</Row>
			<Row className="text-center login-footer">
				<Col sm={12}>
					<ul className="inline-list">
						<li>
							<Link to={forgotLink}>
								{t('forgot_password')}
							</Link>
						</li>
						<li>
							<Link to={registerLink}>
								{t('create_an_account')}
							</Link>
						</li>
					</ul>
				</Col>
			</Row>
		</Grid>
	);
};

export default Login;
