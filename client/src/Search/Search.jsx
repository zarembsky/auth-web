import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Trans, withTranslation } from 'react-i18next';

import { getPersistentParams } from '../utils/getPersistentParams';

class Search extends Component {
	constructor(props) {
		super(props);
		this.style = null;
	}

	componentDidMount() {
		document.title = 'Ghostery Search';
		this.style = document.createElement('style');
		document.head.appendChild(this.style);
		this.style.innerHTML = `
			html, body {
				padding: 0;
				margin: 0;
				height: 100%;
			}
			html {
				background: linear-gradient(166deg, rgba(0,152,240,1) 0%, rgba(0,174,240,1) 24%, rgba(173,138,186,1) 72%, rgba(255,126,116,1) 100%);
			}
			@media (prefers-color-scheme: light) {
				body {
					background: rgba(0, 0, 0, 0.0);
				}
			}
			@media (prefers-color-scheme: dark) {
				body {
					background: rgba(0, 0, 0, 0.3);
				}
			}

			body {
				font-family: OpenSans, Roboto, Helvetica, sans-serif;
			}
			.navbar, footer {
				display: none;
			}
			#app, #content {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.content {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				align-items: center;
				margin-right: 20px;
				margin-left: 20px;
				margin-bottom: 20px;
				width: 670px;
				width: auto;
				max-width: 670px;
			}
			.content {
				background-color: white;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
				padding: 20px;
			}
			#logo-wrapper {
				width: 100%;
				text-align: left;
			}
			#logo {
				width: 85px;
				height: 25px;
			}
			.button {
				text-decoration: none;
				color: white;
				padding: 15px;
				border-radius: 3.5px;
				background-image: linear-gradient(104deg, #67a73a, #00aef0 100%);
				font-size: 16px;
				font-weight: bold;
				font-stretch: normal;
				font-style: normal;
				line-height: normal;
				letter-spacing: normal;
				text-align: center;
				border: 0;
				cursor: pointer;
			}
			.button.gold {
				background-image: none;
				background-color: #b8860b;
			}
			.wrapper {
				padding: 20px 0;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.text {
				font-size: 24px;
				font-weight: 500;
				font-stretch: normal;
				font-style: normal;
				line-height: 1.75;
				letter-spacing: normal;
				color: #4a4a4a;
				text-align: center;
				margin: 0 70px 28px;
			}
			.text span {
				font-size: 18px;
				font-weight: normal;
			}
			.text span em {
				font-weight: bold;
				font-style: normal;
				color: #b8860b;
			}
			.text a, .text a:visited {
				color: #00aef0;
			}
			.img {
				width: 150px;
				height: 90px;
				margin-bottom: 63px;
			}
			.login-img {
				width: 149px;
				height: 149px;
			}
			.options {
				display: grid;
				grid-template-columns: auto auto;
				column-gap: 20px;
				margin: 20px;
			}
			.rectangle {
				width: 354px;
				border-radius: 4px;
				background-color: #ffffff;
				border: solid 1px #cbd4d7;
			}
			.rectangle.active {
				border: solid 4px #00aef0;
			}
		`;
	}

	componentWillUnmount() {
		if (this.style) {
			this.style.remove();
		}
	}

	render() {
		const { match: { params: { locale } } } = this.props;
		const params = getPersistentParams();
		const signinLink = params ? `/${locale}?${params}` : `/${locale}`;
		const registerLink = params ? `/${locale}/register?${params}` : `/${locale}/register`;
		return (
			<div className="content">
				<div id="logo-wrapper">
					<img src="/images/search/ghostery-logo.svg" id="logo" />
				</div>
				<div className="wrapper">
					<img src="/images/search/login.svg" className="img login-img" />
					<div className="text">
						<Trans i18nKey="to_use_private_ad_free_search_please_sign_in_or_create_an_account">
							To use private ad-free search, please
							<br />
							<Link to={signinLink}>
								Sign In
							</Link>
							{' '}
							or
							{' '}
							<Link to={registerLink}>
								Create an Account
							</Link>
							.
						</Trans>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Search);
