import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './example.scss';

export const Example = (props) => {
  const { className, exampleHelloWorld, message } = props;

  const wrapperCS = cs({
    [className]: className,
  });

  return (
    <div className={wrapperCS}>
      <h1 className={css.header}>{message}</h1>
      <button onClick={() => exampleHelloWorld('world')}>Test</button>
    </div>
  );
};

Example.defaultProps = {
  className: null,
  message: '',
};

Example.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  exampleHelloWorld: PropTypes.func.isRequired,
};
