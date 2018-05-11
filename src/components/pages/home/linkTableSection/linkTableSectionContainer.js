import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { linkTableSectionActions } from '../../../../actions/home/linkTableSection';
import { LinkTableSection } from './linkTableSection';

function mapStateToProps(state) {
  const { links } = state.linkTableSection;
  const { pendingUpdate } = state.linkTableSection;
  return { links, pendingUpdate };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(linkTableSectionActions, dispatch);
}

export const LinkTableSectionContainer =
  connect(mapStateToProps, mapDispatchToProps)(LinkTableSection);
