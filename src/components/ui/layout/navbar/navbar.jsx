import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './navbar.scss';

export const Navbar = (props) => {
  const {
    className,
  } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS}>
      <Link to="/">
        Shooooort
      </Link>
    </div>
  );
};

Navbar.defaultProps = {
  className: null,
};

Navbar.propTypes = {
  className: PropTypes.string,
};
