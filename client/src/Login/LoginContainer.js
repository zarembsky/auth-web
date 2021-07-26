import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import Login from './LoginComponent';
import * as actions from './LoginActions';

const mapStateToProps = state => state.login;
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login)));
