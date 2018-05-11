import { LINK_INPUT_SECTION_UPDATE_LINK } from '../../../actions/home/linkInputSection';

const DEFAULT_STATE = {
  input: '',
};

export const linkInputSectionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LINK_INPUT_SECTION_UPDATE_LINK: {
      const { input } = action;
      return {
        ...state,
        input,
      };
    }
    default: {
      return state;
    }
  }
};

export const linkInputSectionReducers = {
  linkInputSection: linkInputSectionReducer,
};
