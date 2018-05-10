import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { linkTableSectionActions } from '../../../../actions/home/linkTableSection';
import { LinkTableSection } from './linkTableSection';

function mapStateToProps(state) {
  const message = get(state, 'example.message');
  return { message };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(linkTableSectionActions, dispatch);
}

export const LinkTableSectionContainer =
  connect(mapStateToProps, mapDispatchToProps)(LinkTableSection);
