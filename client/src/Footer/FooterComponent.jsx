import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

import { version } from '../../../package.json';
import withUTMParams from '../utils/withUTMParams';

const Footer = props => (
	<footer>
		<Grid>
			<Row>
				<Col sm={12}>
					<a href={withUTMParams('https://www.ghostery.com/about-ghostery/privacy/')} target="_blank" rel="noopener noreferrer">
						{props.t('footer_terms_conditions')}
					</a>
					<a href={withUTMParams('https://www.ghostery.com/about-ghostery/ghosterys-website-privacy-policy/')} target="_blank" rel="noopener noreferrer">
						{props.t('footer_privacy_policy')}
					</a>
					<a href={withUTMParams('https://www.ghostery.com/support/')} target="_blank" rel="noopener noreferrer">
						{props.t('footer_support')}
					</a>
					<span>
						&copy; 2009 &ndash;
						{' '}
						{new Date().getFullYear()}
						{' '}
						<span style={{ paddingLeft: '0' }}>
							{props.t('footer_all_rights_reserved')}
						</span>
					</span>
					<span className="version">{`v${version}`}</span>
				</Col>
			</Row>
		</Grid>
	</footer>
);

export default withTranslation()(Footer);
