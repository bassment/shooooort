import { loadState, saveState, clearState } from '../../../utils/localStorage';

import {
  LINK_TABLE_SECTION_UPDATE_LINK_LIST,
  LINK_TABLE_SECTION_CLEAR_LINK_LIST,
  LINK_TABLE_SECTION_UPDATE_LINKS_DATA,
} from '../../../actions/home/linkTableSection';

const DEFAULT_STATE = {
  links: loadState() || [],
  pendingUpdate: true,
};

export const linkTableSectionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LINK_TABLE_SECTION_UPDATE_LINK_LIST: {
      const { links } = state;
      const { link } = action;
      const newLinks = [...links, link];

      saveState(newLinks);

      return {
        ...state,
        links: newLinks,
      };
    }
    case LINK_TABLE_SECTION_UPDATE_LINKS_DATA: {
      const { updatedLinks } = action;

      saveState(updatedLinks);

      return {
        ...state,
        pendingUpdate: false,
        links: updatedLinks,
      };
    }
    case LINK_TABLE_SECTION_CLEAR_LINK_LIST: {
      clearState();

      return {
        ...state,
        links: [],
      };
    }
    default: {
      return state;
    }
  }
};

export const linkTableSectionReducers = {
  linkTableSection: linkTableSectionReducer,
};
