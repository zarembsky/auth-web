import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import PasswordForgot from './PasswordForgotComponent';
import * as actions from './PasswordForgotActions';

const mapStateToProps = state => state.passwordForgot;
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PasswordForgot)));
