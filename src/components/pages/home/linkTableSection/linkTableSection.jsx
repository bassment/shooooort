import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Button } from '../../../ui/button/button';

import css from './linkTableSection.scss';

export const LinkTableSection = (props) => {
  const { className } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS}>
      <div className={css.headerWrapper}>
        <h2 className={css.header}>Previously shortened by you</h2>
        <Button
          className={css.button}
          noBackground
        >
          Clear history
        </Button>
      </div>
      <table className={css.linkTable}>
        <thead>
          <tr>
            <th>Link</th>
            <th>Visits</th>
            <th>Last Visited</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className={css.shortLink}>shooooort.com/fca1ec3fe</span>
              <Button
                className={css.copyButton}
                noBackground
              >
                Click to copy this link
              </Button>
              <span className={css.longLink}>http://zavoloklom.github.io/material-design-iconic-font/icons.html</span>
            </td>
            <td className={css.visitsLabel}>1140</td>
            <td className={css.daysLabel}>2 days ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

LinkTableSection.defaultProps = {
  className: null,
};

LinkTableSection.propTypes = {
  className: PropTypes.string,
};
