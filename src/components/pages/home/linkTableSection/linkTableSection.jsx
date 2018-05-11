import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Button } from '../../../ui/button/button';

import css from './linkTableSection.scss';

export class LinkTableSection extends Component {
  componentDidMount() {
    this.props.linkTableSectionUpdateLinksData();
  }

  render() {
    const {
      className,
      links,
      pendingUpdate,
      linkTableSectionClearLinkList,
      linkTableSectionCopyToClipboard,
    } = this.props;

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
            onClick={linkTableSectionClearLinkList}
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
            {
              !pendingUpdate && links.map((link) => {
                return (
                  <tr key={link.shortcode}>
                    <td>
                      <span className={css.shortLink}>shooooort.com/</span>
                      <span className={css.highlightedLink}>{link.shortcode}</span>
                      <Button
                        className={css.copyButton}
                        noBackground
                        onClick={() => linkTableSectionCopyToClipboard(link.shortcode)}
                      >
                        Click to copy this link
                      </Button>
                      <span className={css.longLink}>{link.url}</span>
                    </td>
                    <td className={css.visitsLabel}>{link.visits}</td>
                    <td className={css.daysLabel}>{link.lastVisited}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

LinkTableSection.defaultProps = {
  className: null,
};

LinkTableSection.propTypes = {
  className: PropTypes.string,
  links: PropTypes.array.isRequired,
  pendingUpdate: PropTypes.bool.isRequired,
  linkTableSectionClearLinkList: PropTypes.func.isRequired,
  linkTableSectionCopyToClipboard: PropTypes.func.isRequired,
  linkTableSectionUpdateLinksData: PropTypes.func.isRequired,
};
