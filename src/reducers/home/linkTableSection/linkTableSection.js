import { EXAMPLE_HELLO_WORLD } from '../../../actions/home/linkTableSection';

const DEFAULT_STATE = {
  message: 'hello',
};

export const linkTableSectionReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case EXAMPLE_HELLO_WORLD: {
      const { message } = state;
      const { world } = action;
      return {
        ...state,
        message: `${message} ${world}`,
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
