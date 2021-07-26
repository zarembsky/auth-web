import React from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Alert as BootstrapAlert
} from 'react-bootstrap';

const Alert = props => (
	<Row>
		<Col md={6} className="medium-centered">
			<BootstrapAlert bsStyle={props.bsStyle} onDismiss={props.onDismiss || null}>
				<p>
					{props.message}
				</p>
			</BootstrapAlert>
		</Col>
	</Row>
);

Alert.propTypes = {
	bsStyle: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onDismiss: PropTypes.func,
};

Alert.defaultProps = {
	onDismiss: null,
};

export default Alert;
