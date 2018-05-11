import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { postLink } from '../../utils/api';

import { applicationShowNotifier } from '../application/application';

import {
  SUCCESS_LINK_CREATED,
  ERROR_URL_NOT_PRESENT,
  ERROR_SHORTCODE_REGEX,
  ERROR_SHORTCODE_CASE_SENSITIVE,
} from '../../config/notifierMessages';
import { NOTIFIER_SUCCESS, NOTIFIER_ALERT } from '../../config/notifierScopes';
import { PROGRESS_SITE_SCOPE } from '../../config/progressScopes';

export const LINK_INPUT_SECTION_UPDATE_LINK = 'LINK_INPUT_SECTION/UPDATE_LINK';
export const LINK_INPUT_SECTION_SHORTEN_LINK = 'LINK_INPUT_SECTION/SHORTEN_LINK';

export const linkInputSectionUpdateLink = e => ({
  type: LINK_INPUT_SECTION_UPDATE_LINK,
  input: e.target.value,
});

export const linkInputSectionShortenLink = () =>
  async (dispatch, getState) => {
    const state = getState();
    const { input } = state.linkInputSection;

    if (input) {
      dispatch(showLoading(PROGRESS_SITE_SCOPE));
      const response = await postLink(input);

      switch (response.status) {
        case 201:
          dispatch(applicationShowNotifier(
            SUCCESS_LINK_CREATED,
            NOTIFIER_SUCCESS,
          ));
          break;
        case 400:
          dispatch(applicationShowNotifier(
            ERROR_URL_NOT_PRESENT,
            NOTIFIER_ALERT,
          ));
          break;
        case 409:
          dispatch(applicationShowNotifier(
            ERROR_SHORTCODE_CASE_SENSITIVE,
            NOTIFIER_ALERT,
          ));
          break;
        case 422:
          dispatch(applicationShowNotifier(
            ERROR_SHORTCODE_REGEX,
            NOTIFIER_ALERT,
          ));
          break;
        default:
          dispatch(applicationShowNotifier(
            ERROR_URL_NOT_PRESENT,
            NOTIFIER_ALERT,
          ));
          break;
      }

      dispatch(hideLoading(PROGRESS_SITE_SCOPE));
    }
  };

export const linkInputSectionActions = {
  linkInputSectionUpdateLink,
  linkInputSectionShortenLink,
};
