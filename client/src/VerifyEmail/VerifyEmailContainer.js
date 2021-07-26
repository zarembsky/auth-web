import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import VerifyEmail from './VerifyEmailComponent';
import * as actions from './VerifyEmailActions';

const mapStateToProps = state => Object.assign({}, state.verifyEmail);
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(VerifyEmail)));
