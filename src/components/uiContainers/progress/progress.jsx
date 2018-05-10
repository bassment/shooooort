import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';
import cs from 'classnames';

import { PROGRESS_SITE_SCOPE } from '../../../config/progressScopes';

import css from './progress.scss';

export const ProgressComponent = (props) => {
  const {
    className,
    classNameProgress,
    type,
    loading,
    scope,
    progressIncrease,
    updateTime,
    maxProgress,
    showFastActions,
  } = props;

  const wrapperCS = cs({
    [className]: className,
    [css.wrapper]: !type,
    [css.wrapperButton]: type === 'button',
    [css.loadingButton]: type === 'button' && loading,
  });

  const progressCS = cs({
    [classNameProgress]: classNameProgress,
    [css.progress]: !type,
    [css.progressButton]: type === 'button',
  });

  const labelCS = cs(
    css.progressLabel,
    {
      [css.loadingLabel]: type === 'button' && loading,
    },
  );

  return (
    <div className={wrapperCS}>
      <span className={labelCS}>Loading...</span>
      <LoadingBar
        className={progressCS}
        {...(scope ? { scope } : {})}
        progressIncrease={progressIncrease}
        updateTime={updateTime}
        maxProgress={maxProgress}
        showFastActions={showFastActions}
      />
    </div>
  );
};

ProgressComponent.defaultProps = {
  className: null,
  classNameProgress: null,
  type: null,
  loading: 0,
  scope: null,
  progressIncrease: 5,
  updateTime: 200,
  maxProgress: 90,
  showFastActions: false,
};

ProgressComponent.propTypes = {
  className: PropTypes.string,
  classNameProgress: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.number,
  scope: PropTypes.string,
  progressIncrease: PropTypes.number,
  updateTime: PropTypes.number,
  maxProgress: PropTypes.number,
  showFastActions: PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loadingBar[ownProps.scope || PROGRESS_SITE_SCOPE],
    ...ownProps,
  };
}

export const Progress =
  connect(mapStateToProps)(ProgressComponent);
