import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import withUTMParams from '../utils/withUTMParams';

const RegisterModal = props => (
	<Modal show={props.showModal} onHide={props.handleCloseModal}>
		<Modal.Header closeButton>
			<Modal.Title>
				{props.t('learn_more_modal_headline')}
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<p>
				{props.t('learn_more_modal_content')}
			</p>
			<p>
				{props.t('privacy_practices')}
				{' '}
				<a
					href={withUTMParams('https://www.ghostery.com/about-ghostery/ghostery-plans-and-products-privacy-policy/')}
					rel="noopener noreferrer"
					target="_blank"
				>
					{props.t('privacy_statement')}
				</a>
				{'.'}
			</p>
		</Modal.Body>
		<Modal.Footer className="text-center">
			<Button bsStyle="link" onClick={props.handleCloseModal}>
				{props.t('close')}
			</Button>
		</Modal.Footer>
	</Modal>
);

export default withTranslation()(RegisterModal);
