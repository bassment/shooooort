import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './simpleExample.scss';

export const SimpleExample = (props) => {
  const { className } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS}>
      <h1 className={css.header}>SimpleExample</h1>
    </div>
  );
};

SimpleExample.defaultProps = {
  className: null,
};

SimpleExample.propTypes = {
  className: PropTypes.string,
};
