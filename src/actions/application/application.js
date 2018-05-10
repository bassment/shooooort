import { NOTIFIER_SITE_SCOPE } from '../../config/notifierScopes';

export const APPLICATION_SHOW_NOTIFIER = 'APPLICATION/SHOW_NOTIFIER';
export const APPLICATION_HIDE_NOTIFIER = 'APPLICATION/HIDE_NOTIFIER';

export const APPLICATION_SAVE_MODULES_SUCCESS = 'APPLICATION/SAVE_MODULES_SUCCESS';
export const APPLICATION_SAVE_MODULES_FAILED = 'APPLICATION/SAVE_MODULES_FAILED';
export const APPLICATION_CLEAR_MODULE_DATA = 'APPLICATION/CLEAR_MODULE_DATA';

export const applicationShowNotifier = (message, notifyType, scope = NOTIFIER_SITE_SCOPE) => {
  return ({
    type: APPLICATION_SHOW_NOTIFIER,
    scope,
    message,
    notifyType,
  });
};

export const applicationHideNotifier = (scope = NOTIFIER_SITE_SCOPE) => {
  return ({
    type: APPLICATION_HIDE_NOTIFIER,
    scope,
  });
};

export const applicationActions = {
  applicationShowNotifier,
  applicationHideNotifier,
};
