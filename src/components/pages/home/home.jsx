import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './home.scss';

export const Home = (props) => {
  const { className } = props;

  const wrapperCS = cs({
    [className]: className,
  });

  return (
    <div className={wrapperCS}>
      <h1 className={css.header}>Home</h1>
    </div>
  );
};

Home.defaultProps = {
  className: null,
};

Home.propTypes = {
  className: PropTypes.string,
};
