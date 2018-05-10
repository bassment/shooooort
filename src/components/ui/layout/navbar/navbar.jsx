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
        <h1 className={css.logo}>Shooooort</h1>
      </Link>
      <h3 className={css.text}>The link shortener with a long name</h3>
    </div>
  );
};

Navbar.defaultProps = {
  className: null,
};

Navbar.propTypes = {
  className: PropTypes.string,
};
