import {
  APPLICATION_SHOW_NOTIFIER,
  APPLICATION_HIDE_NOTIFIER,
} from '../../actions/application/application';

import { NOTIFIER_NONE } from '../../config/notifierScopes';

const DEFAULT_STATE = {
  notifier: {},
};

export const applicationReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case APPLICATION_SHOW_NOTIFIER: {
      const { scope, message, notifyType } = action;
      return {
        ...state,
        notifier: {
          [scope]: {
            message,
            type: notifyType,
          },
        },
      };
    }
    case APPLICATION_HIDE_NOTIFIER: {
      const { scope } = action;
      return {
        ...state,
        notifier: {
          [scope]: {
            message: '',
            type: NOTIFIER_NONE,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const applicationReducers = {
  application: applicationReducer,
};
