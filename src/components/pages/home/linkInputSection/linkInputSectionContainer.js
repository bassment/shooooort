import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { linkInputSectionActions } from '../../../../actions/home/linkInputSection';
import { LinkInputSection } from './linkInputSection';

function mapStateToProps(state) {
  const { input } = state.linkInputSection;
  return { input };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(linkInputSectionActions, dispatch);
}

export const LinkInputSectionContainer =
  connect(mapStateToProps, mapDispatchToProps)(LinkInputSection);
