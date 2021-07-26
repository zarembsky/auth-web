/**
 * 400/500 Error Page
 *
 * Ghostery Auth Web
 * https://signon.ghostery.com/
 *
 * Copyright 2018 Ghostery, Inc. All rights reserved.
 */

import React, { useEffect } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const NotFound = ({ t }) => {
	const { trackPageView } = useMatomo();

	useEffect(() => {
		document.title = t('page_not_found');
		trackPageView({
			documentTitle: `${document.domain}: ${document.title && document.title || 'PAGE TITLE MISSING'}`,
		});
	}, []);

	return (
		<Grid>
			<Row>
				<Col sm={12} className="text-center" id="not-found">
					<h1>
						{t('page_not_found')}
					</h1>
					<img className="ghosty-sad" src="/images/ghosty_sad.png" title={t('page_not_found')} alt={t('page_not_found')} />
					<p>
						{t('page_not_found_text_1')}
					</p>
					<p>
						{t('page_not_found_text_2')}
						&hellip;
					</p>
				</Col>
			</Row>
		</Grid>
	);
};

export default withTranslation()(NotFound);
