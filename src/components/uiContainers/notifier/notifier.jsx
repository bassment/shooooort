import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cs from 'classnames';

import { applicationActions } from '../../../actions/application/application';

import { SvgIcon } from '../../ui/svgIcon/svgIcon';

import closeIcon from '../../../svg/close.svg';

import { NOTIFIER_DURATION } from '../../../config';

import css from './notifier.scss';

import {
  NOTIFIER_SITE_SCOPE,
  NOTIFIER_SUCCESS,
  NOTIFIER_WARNING,
  NOTIFIER_ALERT,
  NOTIFIER_INFO,
  NOTIFIER_NONE,
} from '../../../config/notifierScopes';

export class NotifierComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.type !== nextProps.type ||
        this.props.message !== nextProps.message)
      &&
      nextProps.type && nextProps.type !== NOTIFIER_NONE
    ) {
      this.clearSetInterval();
      this.fadeout = setInterval(this.onFadeout, NOTIFIER_DURATION);
    }
  }

  componentWillUnmount() {
    this.clearSetInterval();
  }

  onFadeout = () => {
    this.props.applicationHideNotifier(this.props.scope);
    this.clearSetInterval();
  }

  clearSetInterval = () => {
    if (this.fadeout) {
      clearInterval(this.fadeout);
    }
  }

  render() {
    const { onFadeout } = this;
    const {
      className,
      message,
      type,
    } = this.props;

    const wrapperCS = cs(
      {
        [className]: className,
        [css.messageSuccess]: type === NOTIFIER_SUCCESS,
        [css.messageWarning]: type === NOTIFIER_WARNING,
        [css.messageAlert]: type === NOTIFIER_ALERT,
        [css.messageInfo]: type === NOTIFIER_INFO,
        [css.show]: type !== NOTIFIER_NONE,
      },
      css.wrapper,
    );

    return (
      <div className={wrapperCS}>
        <p className={css.message}>
          {message}
        </p>
        <SvgIcon
          className={css.closeIcon}
          glyph={closeIcon}
          onClick={onFadeout}
        />
      </div>
    );
  }
}

NotifierComponent.defaultProps = {
  className: null,
  message: '',
  scope: NOTIFIER_SITE_SCOPE,
  type: NOTIFIER_NONE,
};

NotifierComponent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  scope: PropTypes.string,
  type: PropTypes.string,
  applicationHideNotifier: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const notifier = state.application.notifier[ownProps.scope || NOTIFIER_SITE_SCOPE];
  return {
    message: notifier && notifier.message,
    type: notifier && notifier.type,
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(applicationActions, dispatch);
}

export const Notifier =
  connect(mapStateToProps, mapDispatchToProps)(NotifierComponent);
