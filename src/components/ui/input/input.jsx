import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import css from './input.scss';

export class Input extends Component {
  state = {
    value: '',
    focused: false,
  }

  componentWillMount() {
    const { defaultValue } = this.props;
    if (defaultValue) {
      this.setState({ value: defaultValue });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  handleOnRef = (input) => {
    const { onRef } = this.props;
    this.input = input;

    if (onRef) {
      onRef(input);
    }
  }

  handleOnChange = (event) => {
    const { onChange } = this.props;

    this.setState({ value: event.target.value });

    if (onChange) {
      onChange(event);
    }
  }

  handleOnFocus = (event) => {
    const { onFocus } = this.props;

    this.setState({ focused: true });

    if (onFocus) {
      onFocus(event);
    }
  }

  handleOnBlur = (event) => {
    const { onBlur } = this.props;

    this.setState({ focused: false });

    if (onBlur) {
      onBlur(event);
    }
  }

  render() {
    const { value, focused } = this.state;
    const {
      className,
      type,
      placeholder,
    } = this.props;

    const wrapperCS = cs(
      {
        [className]: className,
        [css.focused]: focused,
      },
      css.wrapper,
    );

    return (
      <div className={wrapperCS}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            value={value}
            placeholder={placeholder}
            ref={this.handleOnRef}
            onChange={this.handleOnChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            type={type}
          />
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  className: null,
  defaultValue: '',
  type: 'text',
  placeholder: '',
  onRef: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
};

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
