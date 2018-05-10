import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './svgIcon.scss';

export const SvgIcon = (props) => {
  const { className, glyph, onClick } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.root,
  );

  return (
    <svg className={wrapperCS} onClick={onClick}>
      <use xlinkHref={glyph} />
    </svg>
  );
};

SvgIcon.defaultProps = {
  className: null,
  onClick: null,
};

SvgIcon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
