import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { exampleActions } from '../../../actions/example/example';
import { Home } from './home';

function mapStateToProps(state) {
  const message = get(state, 'example.message');
  return { message };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exampleActions, dispatch);
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
