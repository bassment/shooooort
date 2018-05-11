import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Input } from '../../../ui/input/input';
import { Button } from '../../../ui/button/button';

import css from './linkInputSection.scss';

export const LinkInputSection = (props) => {
  const {
    className,
    input,
    linkInputSectionUpdateLink,
    linkInputSectionShortenLink,
  } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS}>
      <Input
        className={css.input}
        defaultValue={input}
        placeholder="Type your link here..."
        onChange={linkInputSectionUpdateLink}
      />
      <Button
        className={css.button}
        onClick={linkInputSectionShortenLink}
      >
        Shorten this link
      </Button>
    </div>
  );
};

LinkInputSection.defaultProps = {
  className: null,
};

LinkInputSection.propTypes = {
  className: PropTypes.string,
  input: PropTypes.string.isRequired,
  linkInputSectionUpdateLink: PropTypes.func.isRequired,
  linkInputSectionShortenLink: PropTypes.func.isRequired,
};
