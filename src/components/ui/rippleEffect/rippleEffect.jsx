import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './rippleEffect.scss';

export const RippleEffect = (props) => {
  const { className, color, round } = props;

  const wrapperCS = cs(
    {
      [className]: className,
      [css.rippleWhite]: color === 'white',
      [css.rippleBlack]: color === 'black',
      [css.rippleRound]: round,
    },
    css.wrapper,
    css.ripple,
  );

  return (
    <div className={wrapperCS} />
  );
};

RippleEffect.defaultProps = {
  className: null,
  color: 'white',
  round: false,
};

RippleEffect.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  round: PropTypes.bool,
};
