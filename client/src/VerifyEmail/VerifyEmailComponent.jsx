import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Alert from '../Alert';
import withUTMParams from '../utils/withUTMParams';

class VerifyEmail extends Component {
	componentDidMount() {
		const { code } = this.props.match.params;
		document.title = 'Verify';
		this.props.actions.verifyEmailCode(code)
			.then(() => {
				fetch(withUTMParams(`${Config.auth_server.host}/api/v2/refresh_token`), { // eslint-disable-line no-undef
					method: 'POST',
					credentials: 'include',
				})
					.then(res => res.json())
					.then(() => {})
					.catch(() => {
						// TODO
					});
			});
	}

	render() {
		const {
			alertStyle, alertText, match: { params: { locale } }, showContinueButton, t
		} = this.props;
		const continueLink = `${Config.account_web_server.host}`; // eslint-disable-line no-undef
		return (
			<Grid>
				{alertText &&
					<Alert bsStyle={alertStyle} message={t(alertText)} />
				}
				{showContinueButton && (
					<Row id="verify-email-container">
						<Col sm={12} md={8} lg={5} className="medium-centered text-center">
							<a href={`${continueLink}/${locale}`} className="ghostery-blue btn btn-default">Continue</a>
						</Col>
					</Row>
				)}
			</Grid>
		);
	}
}

export default VerifyEmail;
