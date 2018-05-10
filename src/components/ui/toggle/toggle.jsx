import React from 'react';
import PropTypes from 'prop-types';
import ReactToggle from 'react-toggle';
import { omit } from 'lodash';
import cs from 'classnames';

import css from './toggle.scss';

export const Toggle = (props) => {
  const { className, label } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS}>
      <ReactToggle
        className="toggle"
        {...omit(props, 'className', 'label')}
      />
      { label ? <span className={css.label}>{label}</span> : null }
    </div>
  );
};

Toggle.defaultProps = {
  className: null,
  label: null,
};

Toggle.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};
