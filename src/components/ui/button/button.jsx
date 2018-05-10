import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { RippleEffect } from '../../ui/rippleEffect/rippleEffect';

import css from './button.scss';

export const Button = (props) => {
  const {
    className,
    children,
    type,
    onClick,
  } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.button,
  );

  return (
    <button
      type={type}
      className={wrapperCS}
      onClick={onClick}
    >
      {children}
      <RippleEffect />
    </button>
  );
};

Button.defaultProps = {
  className: null,
  children: null,
  type: null,
  onClick: null,
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
