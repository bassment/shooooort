import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { PROGRESS_SITE_SCOPE } from '../../../config/progressScopes';

import { Navbar } from './navbar/navbar';
import { Notifier } from '../../uiContainers/notifier/notifier';
import { Progress } from '../../uiContainers/progress/progress';

import css from './layout.scss';
import sharedCss from '../../../styles/shared.scss';

export const Layout = (props) => {
  const {
    className,
    children,
  } = props;

  const wrapperCS = cs(
    { [className]: className },
    css.wrapper,
  );

  return (
    <div className={wrapperCS} >
      <Progress
        scope={PROGRESS_SITE_SCOPE}
        progressIncrease={5}
        showFastActions
      />
      <div className={sharedCss.container}>
        <Navbar />
        <div className={css.notifierWrapper}>
          <Notifier />
        </div>
        <section>
          {
            React.Children.map(children, child =>
              React.cloneElement(child, {}))
          }
        </section>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  className: null,
  children: [],
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
