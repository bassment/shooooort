import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { LinkInputSectionContainer } from './linkInputSection/linkInputSectionContainer';
// import { LinkTableSectionContainer } from './linkTableSection/linkTableSectionContainer';

export const Home = (props) => {
  const { className } = props;

  const wrapperCS = cs({
    [className]: className,
  });

  return (
    <div className={wrapperCS}>
      <LinkInputSectionContainer />
      {/* <LinkTableSectionContainer /> */}
    </div>
  );
};

Home.defaultProps = {
  className: null,
};

Home.propTypes = {
  className: PropTypes.string,
};
