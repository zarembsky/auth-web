import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import Register from './RegisterComponent';
import * as actions from './RegisterActions';

const mapStateToProps = state => state.register;
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Register)));
