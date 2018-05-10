import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import cs from 'classnames';

import css from './input.scss';

const TextArea = (props) => {
  const { autosizedArea, inputProps } = props;

  return (
    autosizedArea ?
      <TextareaAutosize {...inputProps} /> : <textarea {...inputProps} />
  );
};

TextArea.defaultProps = {
  autosizedArea: false,
};

TextArea.propTypes = {
  autosizedArea: PropTypes.bool,
  inputProps: PropTypes.object.isRequired,
};

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
    const { onFocus } = this.props;

    this.setState({ focused: false });

    if (onFocus) {
      onFocus(event);
    }
  }

  render() {
    const { value, focused } = this.state;
    const {
      className,
      id,
      type,
      label,
      placeholder,
      floatingLabel,
      bordered,
      autosizedArea,
      currency,
      validation,
    } = this.props;

    const wrapperCS = cs(
      {
        [className]: className,
        [css.floatingLabelSpace]: floatingLabel,
      },
      css.wrapper,
    );

    const inputWrapperCS = cs(
      {
        [css.boxed]: bordered,
        [css.inputBordered]: bordered,
        [css.inputBorderedFocused]: focused && bordered,
      },
      css.inputWrapper,
    );

    const inputCS = cs(
      {
        [css.inputNormal]: validation.valid && !bordered,
        [css.inputError]: !validation.valid && !bordered,
        [css.noResize]: type === 'textarea',
        [css.textareaNormal]: type === 'textarea' && !autosizedArea,
      },
      css.input,
    );

    const labelCS = cs(
      {
        [css.fixedLabel]: value || floatingLabel,
        [css.errorLabel]: !validation.valid,
        [css.errorLabelFocused]: focused && !validation.valid,
        [css.labelFocused]: focused,
        [css.hide]: !label,
        [css.labelBordered]: bordered && !floatingLabel && !focused,
      },
      css.label,
    );

    const placeholderCS = cs(
      {
        [css.show]: !label || floatingLabel,
        [css.hide]: value,
        [css.placeholderWrapper]: type === 'textarea' && !autosizedArea,
        [css.boxed]: bordered,
        [css.placeholderBordered]: bordered,
        [css.ellipsisWidth]: !bordered,
        [css.ellipsisHeight]: bordered,
        [css.placeholderFocused]: focused,
      },
      css.placeholder,
    );

    const errorCS = cs(
      {
        [css.hide]: validation.valid,
      },
      css.errorText,
    );

    const inputProps = {
      ...(id ? { id } : {}),
      className: inputCS,
      value,
      ref: this.handleOnRef,
      onChange: this.handleOnChange,
      onFocus: this.handleOnFocus,
      onBlur: this.handleOnBlur,
    };

    const currencySign = currency === 'euro' ? '€' : '$';

    return (
      <div className={wrapperCS}>
        <div className={inputWrapperCS}>
          {
            type === 'textarea' ?
              <TextArea
                autosizedArea={autosizedArea}
                inputProps={inputProps}
              /> :
              <input
                {...inputProps}
                {...(type === 'number' && currency ? { min: '0' } : {})}
                type={type}
              />
          }
        </div>
        <label // eslint-disable-line jsx-a11y/label-has-for
          htmlFor={id}
          className={labelCS}
        >
          {label}
        </label>
        <div className={placeholderCS}>
          {type === 'number' && currency ? `${placeholder} ${currencySign}` : placeholder}
        </div>
        <span className={errorCS}>{validation.message}</span>
      </div>
    );
  }
}

Input.defaultProps = {
  className: null,
  defaultValue: '',
  id: null,
  type: 'text',
  label: '',
  placeholder: '',
  floatingLabel: false,
  bordered: false,
  autosizedArea: false,
  currency: '',
  validation: { valid: true },
  onRef: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
};

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  floatingLabel: PropTypes.bool,
  bordered: PropTypes.bool,
  autosizedArea: PropTypes.bool,
  currency: PropTypes.string,
  validation: PropTypes.object,
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
