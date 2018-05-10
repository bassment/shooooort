import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { linkInputSectionActions } from '../../../../actions/home/linkInputSection';
import { LinkInputSection } from './linkInputSection';

function mapStateToProps(state) {
  const message = get(state, 'example.message');
  return { message };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(linkInputSectionActions, dispatch);
}

export const LinkInputSectionContainer =
  connect(mapStateToProps, mapDispatchToProps)(LinkInputSection);
