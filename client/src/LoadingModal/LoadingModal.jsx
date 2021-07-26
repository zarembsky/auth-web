import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = () => (
	<Modal show backdrop="static" animation={false} className="loading-modal">
		<img src="/images/loading-modal.svg" />
		<div>
			<span className="glyphicon glyphicon-refresh spinning" />
		</div>
	</Modal>
);

export default LoadingModal;
