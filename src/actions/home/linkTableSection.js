import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { getLinkStats } from '../../utils/api';

import { formatDate } from '../../helpers/date';

import { applicationShowNotifier } from '../../actions/application/application';

import { SUBSTITUTION_HOST } from '../../config';
import { SUCCESS_COPY_TO_CLIPBOARD, SUCCESS_CLEAR_LIST } from '../../config/notifierMessages';
import { NOTIFIER_SUCCESS } from '../../config/notifierScopes';
import { PROGRESS_SITE_SCOPE } from '../../config/progressScopes';

export const LINK_TABLE_SECTION_UPDATE_LINK_LIST = 'LINK_TABLE_SECTION/UPDATE_LINK_LIST';
export const LINK_TABLE_SECTION_UPDATE_LINKS_DATA = 'LINK_TABLE_SECTION/UPDATE_LINKS_DATA';
export const LINK_TABLE_SECTION_CLEAR_LINK_LIST = 'LINK_TABLE_SECTION/CLEAR_LINK_LIST';
export const LINK_TABLE_SECTION_COPY_TO_CLIPBOARD = 'LINK_TABLE_SECTION/COPY_TO_CLIPBOARD';

export const linkTableSectionUpdateLinkList = (link) => {
  return {
    type: LINK_TABLE_SECTION_UPDATE_LINK_LIST,
    link,
  };
};

export const linkTableSectionUpdateLinksData = () =>
  async (dispatch, getState) => {
    dispatch(showLoading(PROGRESS_SITE_SCOPE));
    const state = getState();
    const { links } = state.linkTableSection;

    const updatedLinks = await links.reduce(async (acc, link) => {
      const collection = await acc;
      const response = await getLinkStats(link.shortcode);
      if (response.status === 200) {
        const result = await response.json();
        collection.push({
          ...link,
          visits: result.redirectCount,
          lastVisited: result.lastSeenDate ? formatDate(new Date(), new Date(result.lastSeenDate)) : null,
        });
      } else {
        collection.push(link);
      }
      return collection;
    }, Promise.resolve([]));

    dispatch({
      type: LINK_TABLE_SECTION_UPDATE_LINKS_DATA,
      pendingUpdate: false,
      updatedLinks,
    });
    dispatch(hideLoading(PROGRESS_SITE_SCOPE));
  };

export const linkTableSectionClearLinkList = () =>
  (dispatch) => {
    dispatch(applicationShowNotifier(
      SUCCESS_CLEAR_LIST,
      NOTIFIER_SUCCESS,
    ));
    dispatch({
      type: LINK_TABLE_SECTION_CLEAR_LINK_LIST,
    });
  };

export const linkTableSectionCopyToClipboard = shortcode =>
  async (dispatch) => {
    const text = `${SUBSTITUTION_HOST}/${shortcode}`;
    await navigator.clipboard.writeText(text);
    dispatch(applicationShowNotifier(
      SUCCESS_COPY_TO_CLIPBOARD,
      NOTIFIER_SUCCESS,
    ));
    dispatch({
      type: LINK_TABLE_SECTION_COPY_TO_CLIPBOARD,
    });
  };

export const linkTableSectionActions = {
  linkTableSectionUpdateLinkList,
  linkTableSectionClearLinkList,
  linkTableSectionCopyToClipboard,
  linkTableSectionUpdateLinksData,
};
