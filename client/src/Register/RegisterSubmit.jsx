import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const RegisterSubmit = props => (
	<FormGroup className="text-center">
		<Button
			type="submit"
			className="ghostery-blue"
			disabled={props.loading}
		>
			<span className={`${props.loading && 'hide'}`}>
				{props.t('create_an_account')}
			</span>
			<span className={`${!props.loading && 'hide'} glyphicon glyphicon-refresh spinning`} />
		</Button>
	</FormGroup>
);

export default withTranslation()(RegisterSubmit);

RegisterSubmit.propTypes = {
	loading: PropTypes.bool.isRequired,
};
