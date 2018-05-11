import { applicationReducers } from './application/application';
import { linkInputSectionReducers } from './home/linkInputSection/linkInputSection';
import { linkTableSectionReducers } from './home/linkTableSection/linkTableSection';

export const appReducers = Object.assign(
  {},
  applicationReducers,
  linkInputSectionReducers,
  linkTableSectionReducers,
);
