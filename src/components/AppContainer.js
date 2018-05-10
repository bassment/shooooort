import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { PROGRESS_SITE_SCOPE } from '../config/progressScopes';

import { applicationActions } from '../actions/application/application';
import { App } from './App';

function mapStateToProps(state, ownProps) {
  const currentLocation = state.router.location.pathname || '/';
  return {
    currentLocation,
    siteLoading: state.loadingBar[PROGRESS_SITE_SCOPE],
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(applicationActions, dispatch);
}

export const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
