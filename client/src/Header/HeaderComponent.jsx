import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { redirectAuthenticatedRequest } from '../utils/redirectAuthenticatedRequest';
import withUTMParams from '../utils/withUTMParams';

class Header extends Component {
	constructor(props) {
		super(props);

		// Avoid race condition with the email validation request in VerifyEmailComponent
		const { history: { location: { pathname } } } = props;
		if (pathname && pathname.includes('/verify/validate_account/')) { return; }

		const userId = Cookies.get('user_id');
		const csrfToken = Cookies.get('csrf_token');
		if (userId && csrfToken) {
			redirectAuthenticatedRequest();
		}
	}

	render() {
		const { domain } = Config; // eslint-disable-line no-undef
		return (
			<header>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<a href={withUTMParams(`https://${domain}`)}>
								<img src="/images/ghostery_logo.svg" />
							</a>
						</Navbar.Brand>
					</Navbar.Header>
				</Navbar>
			</header>
		);
	}
}

export default withRouter(Header);
